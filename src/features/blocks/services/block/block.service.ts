import { Injectable, NotFoundException } from '@nestjs/common';
import { IBlockService } from './Iblock.service';
import { BlockGetDTO } from '../../dtos/block-get.dto';
import { HttpService } from '@nestjs/axios';
import * as https from 'https'
import { Observable, lastValueFrom, map } from 'rxjs';
import { BlocksRepository } from '../../repositories/block.repository';
import { TransactionsRepository } from 'src/features/transactions/repositories/transaction.recovery';
import { SiacoinOutputDTO } from 'src/features/transactions/dtos/siacoinoutput.dto';
import { BaseMapper } from 'src/shared/helpers/base.mapper';
import { Block } from '../../schemas/block.shema';

import * as nacl from 'tweetnacl';
import * as util from 'tweetnacl-util';

import { Logger } from '@nestjs/common';
import { TransactionDTO } from 'src/features/transactions/dtos/transaction.dto';
import { Transaction } from 'src/features/transactions/schemas/transaction.shema';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { SiacoinInputDTO } from 'src/features/transactions/dtos/siacoininput.dto';
import { log } from 'console';

@Injectable()
export class BlockService implements IBlockService {

    constructor(
        private httpService: HttpService,
        private readonly blockRepository: BlocksRepository,
        private readonly transactionRepository: TransactionsRepository,
    ) {
        this.getHeight()
        // this.subscribe()
    }
    getBlocks(): BlockGetDTO[] {
        throw new Error('Method not implemented.');
    }
    private currentBlockHeigh: number;
    private previousBlock: number;

    private readonly logger = new Logger(BlockService.name);
    // private readonly apiUrl = 'https://f33d-54-198-46-109.ngrok-free.app/consensus/subscribe/0100000000000000000000000000000000000000000000000000000000000000';

    // subscribeToConsensusStream(): Observable<any> {
    //   return new Observable((observer) => {
    //     const source = axios.CancelToken.source();

    //     const intervalId = setInterval(() => {
    //       axios.get(this.apiUrl, { headers: { 'User-Agent': 'Sia-Agent' }, cancelToken: source.token })
    //         .then((response) => {
    //           observer.next(response.data);
    //         })
    //         .catch((error) => {
    //           if (axios.isCancel(error)) {
    //             // Subscription cancelled
    //             observer.complete();
    //           } else {
    //             observer.error(error);
    //           }
    //         });
    //     }, 1000); // Adjust the interval as needed

    //     return () => {
    //       clearInterval(intervalId);
    //       source.cancel('Subscription cancelled');
    //     };
    //   }).pipe(
    //     map((data: any) => {
    //       // Process and transform the data as needed
    //       this.logger.log('Received data from consensus stream:', data);
    //       return data;
    //     }),
    //   );
    // }

    // set cron ton execute request every day

    async getHeight() {
        const url = `https://f33d-54-198-46-109.ngrok-free.app/consensus`;
        const headers = { 'User-Agent': 'Sia-Agent' };

        try {
            this.logger.log("Checking consensus data");

            const response = await lastValueFrom(
                this.httpService.get(url, {
                    headers,
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                }).pipe(
                    map(resp => resp.data),
                ),
            );
            if (response.height) {
                this.currentBlockHeigh = response.height;
                this.previousBlock = response.height;
                const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
                await this.getNextBlock();
                await sleep(30000);
                await this.getPreviousBlock();

                this.logger.log("Result", response);
            }

        } catch (error) {
            this.logger.error("Error fetching consensus data", error);
        }
    }

    @Cron("*/4 * * * * *")
    async getNextBlock() {
        this.logger.log("Getting next block at " + this.previousBlock)
        if (this.previousBlock <= 0) {
            return;
        }
        const result = await this.getBlock(this.previousBlock.toString());
        log("login result value", result);
        if (result) {
            this.previousBlock--;
        }
    }

    @Cron("*/3 * * * * *")
    async getPreviousBlock() {
        this.logger.log("Getting previous block at " + this.currentBlockHeigh)
        const result = await this.getBlock(this.currentBlockHeigh.toString());
        log(result);
        if (result) {
            this.currentBlockHeigh++;
        }
    }


    async getBlock(height: string): Promise<boolean> {
        // get block from database
        const blockOfBD = await this.blockRepository.findOne({
            height: height
        }).catch((e: NotFoundException) => {
            log(e.message);
        })

        // log("block get", blockOfBD)
        // check if already exists 
        if (!blockOfBD) {
            const url = `https://f33d-54-198-46-109.ngrok-free.app/consensus/blocks?height=${height}`;
            const headers = { 'User-Agent': 'Sia-Agent' };
            var result = new BlockGetDTO();
            try {
                result = await lastValueFrom(
                    this.httpService.get(url, {
                        headers,
                        httpsAgent: new https.Agent({ rejectUnauthorized: false })
                    }).pipe(
                        map(resp => resp.data)
                    )
                );
            } catch (fetchError) {
                this.logger.error("Error fetching block data: " + fetchError.message);
                // Handle the error as needed for block data fetching
                return;
            }
            const blockMapper = new BaseMapper<BlockGetDTO, Block>(BlockGetDTO, Block);
            const savedBlock = blockMapper.toEntity(result);


            this.logger.log("adding new block... at " + height);
            const transactionIds = [];

            const transactionMapper = new BaseMapper<TransactionDTO, Transaction>(TransactionDTO, Transaction);
            const transactionsGet = result.transactions;

            for (let index = 0; index < transactionsGet.length; index++) {
                const transaction = transactionsGet[index];
                const toSaveTransaction = transactionMapper.toEntity(transaction);
                // this.logger.log("adding new transaction...");

                const transactionOfBD = await this.transactionRepository.findOne({
                    id: transaction.id
                }).catch((e: NotFoundException) => {
                    log(e.message)
                });
                // log("transactionOfBD get", transactionOfBD);

                if (!transactionOfBD) {
                    toSaveTransaction.height = result.height;
                    const savedTransaction = await this.transactionRepository.create(toSaveTransaction)
                        .then(result => {
                            this.logger.log("added transaction ", result.id);
                            transactionIds.push(result.id);
                        })
                        .catch(err => {
                            log(err.message);
                            return false;
                        });
                    // this.logger.log("new transaction added to database", savedTransaction);
                }
            }
            // add transactionIds to the saved block
            savedBlock.transactionId = transactionIds;
            const newBlock = await this.blockRepository.create(savedBlock)
                .then(result => {
                    this.logger.log("added block ", result.id);
                    return true;
                })
                .catch(error => {
                    this.logger.error(error.message);
                    return false;
                });
        } else {
            this.logger.log("block " + height + " already added");
            return true;
        }

    }



    // // Fonction pour décoder la clé publique
    // private decodePublicKey(key: string): Uint8Array {
    //     return util.decodeBase64(key);
    // }

    // // Fonction pour vérifier la signature
    // private verifySignature(message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean {
    //     return nacl.sign.detached.verify(message, signature, publicKey);
    // }

    // // Fonction pour décrypter une SiacoinOutput individuelle
    // private decryptSiacoinOutput(unlockhash: string, value: string): any {
    //     // Ajoutez ici la logique pour décrypter les données selon votre besoin.
    //     // Dans cet exemple, nous retournons simplement les mêmes données.
    //     return { unlockhash, value };
    // }

    // // Fonction pour décrypter les SiacoinOutputs
    // private decryptSiacoinOutputs(outputs: SiacoinInputDTO[]): any[] {
    //     const decryptedOutputs = [];

    //     outputs.forEach(output => {
    //         const unlockhash = output.unlockhash;
    //         const value = output.value;

    //         // Décoder la clé publique
    //         const publicKey = this.decodePublicKey(output.unlockconditions.publickeys[0].key);

    //         // Vérifier la signature
    //         const isValidSignature = this.verifySignature(value, output.signature, publicKey);

    //         // Si la signature est valide, décrypter les données
    //         if (isValidSignature) {
    //             const decryptedData = this.decryptSiacoinOutput(unlockhash, value);
    //             decryptedOutputs.push(decryptedData);
    //         } else {
    //             this.logger.warn(`Invalid signature for SiacoinOutput with unlockhash: ${unlockhash}. Skipping decryption.`);
    //         }
    //     });

    //     return decryptedOutputs;
    // }



}
