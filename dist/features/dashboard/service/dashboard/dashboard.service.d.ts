/// <reference types="node" />
import { HttpService } from '@nestjs/axios';
import * as https from 'https';
import { LatestDataDTO } from '../../dtos/latest-data.dto';
import { HostRepository } from 'src/features/hosts/repositories/host.repositort';
import { TransactionsRepository } from 'src/features/transactions/repositories/transaction.recovery';
export declare class DashboardService {
    private httpService;
    private readonly hostRepository;
    private readonly transactionRepository;
    constructor(httpService: HttpService, hostRepository: HostRepository, transactionRepository: TransactionsRepository);
    private readonly logger;
    httpAgent: https.Agent;
    coinmarketcapURL: string;
    username: string;
    password: string;
    renterdURL: string;
    base64Credentials: string;
    total_storage: number;
    remaining_storage: number;
    used_storage: number;
    getCMCData(): Promise<LatestDataDTO>;
    getHost(): Promise<any>;
}
