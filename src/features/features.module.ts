import { Module } from '@nestjs/common';
import { BlocksModule } from './blocks/blocks.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [BlocksModule, TransactionsModule]
})
export class FeaturesModule {}
