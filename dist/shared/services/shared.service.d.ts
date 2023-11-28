/// <reference types="node" />
import * as https from 'https';
import { HttpService } from "@nestjs/axios";
import { BlocksRepository } from "src/features/blocks/repositories/block.repository";
import { TransactionsRepository } from "src/features/transactions/repositories/transaction.recovery";
export declare class SharedService {
    private httpService;
    private readonly blockRepository;
    private readonly transactionRepository;
    constructor(httpService: HttpService, blockRepository: BlocksRepository, transactionRepository: TransactionsRepository);
    baseUrl: string;
    private readonly logger;
    httpAgent: https.Agent;
    private currentBlockHeigh;
    private previousBlock;
    private response;
    getHeight(): Promise<void>;
    getBlock(height: string): Promise<boolean>;
}
