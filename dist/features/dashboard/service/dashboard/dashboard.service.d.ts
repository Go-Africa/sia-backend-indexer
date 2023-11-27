/// <reference types="node" />
import { HttpService } from '@nestjs/axios';
import * as https from 'https';
import { LatestDataDTO } from '../../dtos/latest-data.dto';
import { HostRepository } from 'src/features/hosts/repositories/host.repositort';
export declare class DashboardService {
    private httpService;
    private readonly hostRepository;
    constructor(httpService: HttpService, hostRepository: HostRepository);
    private readonly logger;
    httpAgent: https.Agent;
    coinmarketcapURL: string;
    username: string;
    password: string;
    renterdURL: string;
    base64Credentials: string;
    getCMCData(): Promise<LatestDataDTO>;
    getHost(): Promise<any>;
}
