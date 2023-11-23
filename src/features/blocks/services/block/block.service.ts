import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

// import * as nacl from 'tweetnacl';
// import * as util from 'tweetnacl-util';

import { Logger } from '@nestjs/common';
import { TransactionDTO } from 'src/features/transactions/dtos/transaction.dto';
import { Transaction } from 'src/features/transactions/schemas/transaction.shema';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
// import { SiacoinInputDTO } from 'src/features/transactions/dtos/siacoininput.dto';
import { log } from 'console';
import { BlockResponseDTO } from '../../dtos/block-response.dto';

@Injectable()
export class BlockService  {

    constructor(
        private httpService: HttpService,
        private readonly blockRepository: BlocksRepository,
        private readonly transactionRepository: TransactionsRepository,
    ) {
        this.getHeight()
    }
    baseUrl = process.env.RENTERD_BASE_URL;

    async getBlocks(page?: number, limit?: number) {
        if(page < 1){
            throw new HttpException("la page dois etre supérieur à 0.", HttpStatus.BAD_REQUEST);
        }
        try {
            // Exécutez la requête avec pagination et tri
            const blocks = await this.blockRepository
                .findPaginate({}, page, limit)
            // log("result", blocks)
            return blocks;
        } catch (error) {
            // Gérez les erreurs, par exemple, en enregistrant ou en lançant une nouvelle exception
            console.error('Erreur lors de la récupération des blocs :', error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    private currentBlockHeigh: number;
    private previousBlock: number;

    private readonly logger = new Logger(BlockService.name);

    async getHeight() {
        const url = `${this.baseUrl}/consensus`;
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

                // this.logger.log("Result", response);
            }

        } catch (error) {
            this.logger.error("Error fetching consensus data", error);
        }
    }

    @Cron("*/1 * * * * *")
    async getNextBlock() {
        this.logger.log("Getting previous block at " + this.previousBlock)
        if (this.previousBlock <= 0) {
            return;
        }
        const result = await this.getBlock(this.previousBlock.toString());
        if (result) {
            this.previousBlock--;
        }
    }

    @Cron("*/1 * * * * *")
    async getPreviousBlock() {
        this.logger.log("Getting next block at " + this.currentBlockHeigh)
        const result = await this.getBlock(this.currentBlockHeigh.toString());
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
            const url = `${this.baseUrl}/consensus/blocks?height=${height}`;
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
                // log("transactionOfBD get", toSaveTransaction);

                if (!transactionOfBD) {
                    toSaveTransaction.height = result.height;
                    toSaveTransaction.timestamp = result.timestamp;
                    toSaveTransaction.siacoinoutputs = transaction.siacoinoutputs;
                    const savedTransaction = this.transactionRepository.create(toSaveTransaction)
                        .then(result => {
                            // this.logger.log("added transaction ", result.id);
                            transactionIds.push(result.id);
                        })
                        .catch(err => {
                            this.logger.error(typeof(err), err.message);
                            // return false;
                        });
                    // this.logger.log("new transaction added to database", savedTransaction);
                }
            }
            // add transactionIds to the saved block
            savedBlock.transactionId = transactionIds;
            const newBlock = this.blockRepository.create(savedBlock)
                .then(result => {
                    
                    this.logger.log("added block ", result.id);
                    return true;
                })
                .catch(error => {
                    this.logger.error(typeof(error), error.message);
                    if(error.message.startsWith("E11000 duplicate key error collection:")){
                        this.logger.log("transaction " + result.id + " already added");
                        return true;
                    }
                    return false;
                });
        } else {
            this.logger.log("block " + height + " already added");
            return true;
        }
    }

    async getOneBlock(height: string) {
        // get block from database
        const blockOfBD = await this.blockRepository.findOne({
            height: height
        }).catch((e: NotFoundException) => {
            log(e.message);
        })

        // log("block get", blockOfBD)
        // check if already exists 
        if (!blockOfBD) {
            throw new HttpException("This block doen't exist", HttpStatus.NOT_FOUND);
        } else {
            this.logger.log("block " + height + " already added");
            return blockOfBD;
        }

    }
}
