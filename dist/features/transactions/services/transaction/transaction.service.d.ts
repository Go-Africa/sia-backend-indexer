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
import { TransactionsRepository } from '../../repositories/transaction.recovery';
export declare class TransactionService {
    private httpService;
    private readonly transactionRepository;
    constructor(httpService: HttpService, transactionRepository: TransactionsRepository);
    baseUrl: string;
    getTransactions(page: number, limit: number): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, import("../../schemas/transaction.shema").Transaction> & import("../../schemas/transaction.shema").Transaction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    getOneTransaction(id: string): Promise<import("../../schemas/transaction.shema").Transaction>;
}
