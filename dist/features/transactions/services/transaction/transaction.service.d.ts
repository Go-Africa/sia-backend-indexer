import { HttpService } from '@nestjs/axios';
import { TransactionsRepository } from '../../repositories/transaction.recovery';
export declare class TransactionService {
    private httpService;
    private readonly transactionRepository;
    constructor(httpService: HttpService, transactionRepository: TransactionsRepository);
    baseUrl: string;
    getTransactions(page: number, limit: number): Promise<{
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
    getOneTransaction(id: string): Promise<import("../../schemas/transaction.shema").Transaction>;
}
