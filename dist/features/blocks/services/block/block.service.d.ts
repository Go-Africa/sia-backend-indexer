/// <reference types="node" />
import * as https from 'https';
import { BlocksRepository } from '../../repositories/block.repository';
export declare class BlockService {
    private readonly blockRepository;
    constructor(blockRepository: BlocksRepository);
    baseUrl: string;
    httpAgent: https.Agent;
    private readonly logger;
    getBlocks(page?: number, limit?: number): Promise<{
        docs: (import("mongoose").Document<unknown, {}, import("../../schemas/block.shema").Block> & import("../../schemas/block.shema").Block & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        totalDocs: number;
        limit: number;
        page: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    }>;
    getOneBlock(height: string): Promise<import("../../schemas/block.shema").Block>;
}
