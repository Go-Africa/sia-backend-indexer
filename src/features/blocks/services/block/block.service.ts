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
export class BlockService {

    constructor(
        private httpService: HttpService,
        private readonly blockRepository: BlocksRepository,
        private readonly transactionRepository: TransactionsRepository,
    ) {
        this.getHeight()
    }
    baseUrl = process.env.RENTERD_BASE_URL;

    async getBlocks(page?: number, limit?: number) {
        if (page < 1) {
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
    
            // Fetch consensus data from the specified URL
            const response = await lastValueFrom(
                this.httpService.get(url, {
                    headers,
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                }).pipe(
                    map(resp => resp.data),
                ),
            );
    
            // Check if the response contains the height property
            if (response.height) {
                // Set initial block height values
                this.currentBlockHeigh = response.height;
                this.previousBlock = response.height;
                console.log(response.height);
    
                // Define a function to get the previous block asynchronously
                const getPreviousBlock = async () => {
                    while (this.previousBlock >= 0) {
                        this.logger.log("Getting previous block at " + this.previousBlock);
                        const result = await this.getBlock(this.previousBlock.toString());
                        this.previousBlock--;
                    }
                };
    
                // Define a function to get the next block asynchronously
                const getNextBlock = async () => {
                    while (true) {
                        this.logger.log("Getting next block at " + this.currentBlockHeigh);
                        const result = await this.getBlock(this.currentBlockHeigh.toString());
                        this.currentBlockHeigh++;
                    }
                };
    
                // Execute getPreviousBlock and getNextBlock concurrently
                await Promise.all([getPreviousBlock(), getNextBlock()]);
            }
        } catch (error) {
            // Handle errors that may occur during the process
            this.logger.error("Error fetching consensus data", error);
        }
    }
    

    async getBlock(height: string): Promise<boolean> {
        const url = `${this.baseUrl}/consensus/blocks?height=${height}`;
        const headers = { 'User-Agent': 'Sia-Agent' };
    
        try {
            const result = await lastValueFrom(
                this.httpService.get(url, {
                    headers,
                    httpsAgent: new https.Agent({ rejectUnauthorized: false })
                }).pipe(
                    map(resp => resp.data)
                )
            );
    
            const blockMapper = new BaseMapper<BlockGetDTO, Block>(BlockGetDTO, Block);
            const savedBlock = blockMapper.toEntity(result);
    
            const transactionMapper = new BaseMapper<TransactionDTO, Transaction>(TransactionDTO, Transaction);
            const transactionsGet = result.transactions;
    
            // Use Promise.all to create transactions concurrently
            const transactionPromises = transactionsGet.map(async transaction => {
                const toSaveTransaction = transactionMapper.toEntity(transaction);
                toSaveTransaction.height = result.height;
                toSaveTransaction.timestamp = result.timestamp;
                toSaveTransaction.siacoinoutputs = transaction.siacoinoutputs;
    
                try {
                    const savedTransaction = await this.transactionRepository.create(toSaveTransaction);
                    // this.logger.log("Added transaction ", savedTransaction.id);
                    return savedTransaction.id;
                } catch (error) {
                    this.logger.error(typeof (error), error.message);
                    if (error.message.startsWith("E11000 duplicate key error collection:")) {
                        this.logger.log("Transaction " + transaction.id + " already added");
                    }
                    return null;
                }
            });
    
            // Wait for all transactions to be created
            const transactionIds = await Promise.all(transactionPromises);
    
            // Remove null values from transactionIds (failed creations due to duplicate key errors)
            savedBlock.transactionId = transactionIds.filter(id => id !== null);
    
            // Use async/await for block creation
            try {
                const newBlock = await this.blockRepository.create(savedBlock);
                this.logger.log("Added block at height", newBlock.height);
                return true;
            } catch (error) {
                this.logger.error(typeof (error), error.message);
                if (error.message.startsWith("E11000 duplicate key error collection:")) {
                    this.logger.log("Block " + result.id + " already added");
                }
                return false;
            }
        } catch (fetchError) {
            this.logger.error("Error fetching block data: " + fetchError.message);
            // Handle the error as needed for block data fetching
            return false;
        }   
    }
    

    async getOneBlock(height: string) {
        // get block from database
        const blockOfBD = await this.blockRepository.findOne({
            height: height
        }).catch((e: NotFoundException) => {
            // log(e.message);
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
