import { TransactionService } from '../../services/transaction/transaction.service';
export declare class TransactionController {
    private _transactionService;
    constructor(_transactionService: TransactionService);
    getAllTransaction(page?: number, limit?: number): Promise<{
        docs: (import("mongoose").Document<unknown, {}, import("../../schemas/transaction.shema").Transaction> & import("../../schemas/transaction.shema").Transaction & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        totalDocs: number;
        limit: number;
        page: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    }>;
    getOneTransaction(hash: string): Promise<import("../../schemas/transaction.shema").Transaction>;
}
