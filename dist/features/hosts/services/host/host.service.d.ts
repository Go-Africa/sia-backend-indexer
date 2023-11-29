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
import { Host } from '../../schemas/host.schema';
import { HostRepository } from '../../repositories/host.repositort';
export declare class HostService {
    private httpService;
    private readonly hostRepository;
    constructor(httpService: HttpService, hostRepository: HostRepository);
    private readonly logger;
    httpAgent: https.Agent;
    username: string;
    password: string;
    renterdURL: string;
    base64Credentials: string;
    getHostFromSiad(): Promise<any>;
    getHosts(page?: number, limit?: number): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, {
        page: number;
        limit: number;
        sort: {
            timestamp: number;
        };
    }, Host> & Host & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    getOneHost(publicKey: string): Promise<Host>;
}
