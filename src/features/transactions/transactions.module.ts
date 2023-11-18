import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction/transaction.service';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { SharedModule } from 'src/shared/shared.module';
import { TransactionsRepository } from './repositories/transaction.recovery';

@Module({
  imports: [
    SharedModule
  ],
  providers: [
    TransactionService,
    TransactionsRepository
  ],
  controllers: [
    TransactionController
  ]
})
export class TransactionsModule {}
