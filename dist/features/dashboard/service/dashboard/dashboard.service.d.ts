/// <reference types="node" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-paginate-v2" />
import { HttpService } from '@nestjs/axios';
import * as https from 'https';
import { LatestDataDTO } from '../../dtos/latest-data.dto';
import { HostRepository } from 'src/features/hosts/repositories/host.repositort';
import { TransactionsRepository } from 'src/features/transactions/repositories/transaction.recovery';
import { LatestDataRepository } from '../../repositories/latest-data.repository';
export declare class DashboardService {
    private httpService;
    private readonly hostRepository;
    private readonly transactionRepository;
    private readonly latestRepository;
    constructor(httpService: HttpService, hostRepository: HostRepository, transactionRepository: TransactionsRepository, latestRepository: LatestDataRepository);
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
    getLatestData(): Promise<import("mongoose").FlattenMaps<import("../../schemas/latest-data.schema").LatestData> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getCMCData(): Promise<LatestDataDTO>;
}
