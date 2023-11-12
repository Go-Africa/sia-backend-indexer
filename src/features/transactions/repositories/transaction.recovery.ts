import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { Transaction } from '../schemas/transaction.shema';

@Injectable()
export class TransactionsRepository extends AbstractRepository<Transaction> {
  protected readonly logger = new Logger(TransactionsRepository.name);

  constructor(
    @InjectModel(Transaction.name) TransactionModel: Model<Transaction>,
    @InjectConnection() connection: Connection,
  ) {
    super(TransactionModel, connection);
  }
}
