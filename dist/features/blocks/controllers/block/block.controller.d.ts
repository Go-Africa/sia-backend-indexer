import { BlockService } from '../../services/block/block.service';
export declare class BlockController {
    private _blockService;
    constructor(_blockService: BlockService);
    getAllBlock(page?: number, limit?: number): Promise<{
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
