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
import { TransactionService } from '../../services/transaction/transaction.service';
export declare class TransactionController {
    private _transactionService;
    constructor(_transactionService: TransactionService);
    getAllactivity(page?: number, limit?: number, offset?: number): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, {
        customLabels: {
            docs: string;
            page: string;
            totalPages: string;
            limit: string;
            totalDocs: string;
        };
        offset: number;
        limit: number;
        page: number;
        sort: {
            timestamp: number;
        };
    }, import("../../schemas/transaction.shema").Transaction> & import("../../schemas/transaction.shema").Transaction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    getOneTransaction(hash: string): Promise<import("../../schemas/transaction.shema").Transaction>;
}
