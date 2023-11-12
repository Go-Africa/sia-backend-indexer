import { Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { Transaction } from '../schemas/transaction.shema';
export declare class TransactionsRepository extends AbstractRepository<Transaction> {
    protected readonly logger: Logger;
    constructor(TransactionModel: Model<Transaction>, connection: Connection);
}
