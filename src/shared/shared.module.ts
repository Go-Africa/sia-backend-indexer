import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InterceptorModule } from './interceptors/interceptor.module';
import { HttpModule } from '@nestjs/axios';
import { SharedService } from './services/shared.service';
import { BlocksRepository } from 'src/features/blocks/repositories/block.repository';
import { TransactionsRepository } from 'src/features/transactions/repositories/transaction.recovery';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    InterceptorModule
  ],
  exports: [
    DatabaseModule,
    HttpModule
  ],
  providers: [
    SharedService,
    BlocksRepository,
    TransactionsRepository,
  ]
})
export class SharedModule {}
