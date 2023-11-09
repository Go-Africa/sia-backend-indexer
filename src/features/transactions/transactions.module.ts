import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction/transaction.service';
import { TransactionController } from './controllers/transaction/transaction.controller';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionsModule {}
