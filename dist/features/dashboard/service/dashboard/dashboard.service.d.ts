/// <reference types="node" />
import { HttpService } from '@nestjs/axios';
import * as https from 'https';
export declare class DashboardService {
    private httpService;
    constructor(httpService: HttpService);
    private readonly logger;
    httpAgent: https.Agent;
    coinmarketcapURL: string;
    username: string;
    password: string;
    renterdURL: string;
    base64Credentials: string;
    getCMCData(): Promise<any>;
    getHost(): Promise<any>;
}
