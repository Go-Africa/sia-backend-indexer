import { Injectable } from "@nestjs/common";
import * as https from 'https'
import { Logger } from '@nestjs/common';
import { TransactionDTO } from 'src/features/transactions/dtos/transaction.dto';
import { Transaction } from 'src/features/transactions/schemas/transaction.shema';
import { BaseMapper } from 'src/shared/helpers/base.mapper';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from "@nestjs/axios";
import { BlockGetDTO } from "src/features/blocks/dtos/block-get.dto";
import { BlocksRepository } from "src/features/blocks/repositories/block.repository";
import { Block } from "src/features/blocks/schemas/block.shema";
import { TransactionsRepository } from "src/features/transactions/repositories/transaction.recovery";

@Injectable()
export class SharedService {

    constructor(
        private httpService: HttpService,
        private readonly blockRepository: BlocksRepository,
        private readonly transactionRepository: TransactionsRepository,
    ) {
        this.getHeight()
    }

    baseUrl = process.env.RENTERD_BASE_URL;
    private readonly logger = new Logger(SharedService.name);
    httpAgent = new https.Agent({ rejectUnauthorized: false });
    private currentBlockHeigh: number;
    private previousBlock: number;
    private response: any;

    async getHeight() {
        const url = `${this.baseUrl}/consensus`;
        const headers = { 'User-Agent': 'Sia-Agent' };
    
        try {
            this.logger.log("Checking consensus data");
    
            // Fetch consensus data from the specified URL
            do {
                try {
                    this.logger.verbose("Checking consensus data");
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    this.response = await lastValueFrom(
                        this.httpService.get(url, {
                            headers,
                            httpsAgent: this.httpAgent,
                        }).pipe(
                            map(resp => resp.data),
                        ),
                    ); 
                } catch (error) {
                    
                }
                
            } while (!this.response) 
            
            // Check if the response contains the height property
            if (this.response.height) {
                // Set initial block height values
                this.currentBlockHeigh = this.response.height;
                this.previousBlock = 117190;
                console.log(this.response.height);
    
                // Define a function to get the previous block asynchronously
                const getPreviousBlock = async () => {
                    while (this.previousBlock >= 0) {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        this.logger.log("Getting previous block at " + this.previousBlock);
                        const result = await this.getBlock(this.previousBlock.toString());
                        if (result) {
                            this.previousBlock--;
                        }
                    }
                };
    
                // Define a function to get the next block asynchronously
                const getNextBlock = async () => {
                    while (true) {
                        await new Promise(resolve => setTimeout(resolve, 120000));
                        this.logger.log("Getting next block at " + this.currentBlockHeigh);
                        const result = await this.getBlock(this.currentBlockHeigh.toString());
                        if (result) {
                            this.currentBlockHeigh++;
                        }
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
                    httpsAgent: this.httpAgent,
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
                    return true;
                }
                return false;
            }
        } catch (fetchError) {
            this.logger.error("Error fetching block data: " + fetchError.message);
            // Handle the error as needed for block data fetching
            return false;
        }   
    }
}