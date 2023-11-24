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
import { BlocksRepository } from '../../repositories/block.repository';
import { TransactionsRepository } from 'src/features/transactions/repositories/transaction.recovery';
import { Block } from '../../schemas/block.shema';
export declare class BlockService {
    private httpService;
    private readonly blockRepository;
    private readonly transactionRepository;
    constructor(httpService: HttpService, blockRepository: BlocksRepository, transactionRepository: TransactionsRepository);
    baseUrl: string;
    getBlocks(page?: number, limit?: number): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, {
        page: number;
        limit: number;
        sort: {
            timestamp: number;
        };
    }, Block> & Block & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    private currentBlockHeigh;
    private previousBlock;
    private readonly logger;
    getHeight(): Promise<void>;
    getBlock(height: string): Promise<boolean>;
    getOneBlock(height: string): Promise<Block>;
}
