import { Module } from '@nestjs/common';
import { BlockService } from './services/block/block.service';
import { BlockController } from './controllers/block/block.controller';
import { HttpModule } from '@nestjs/axios';
import { CoveredFieldsRepository } from '../transactions/repositories/coveredfield.repository';
import { SiacoinOutputsRepository } from '../transactions/repositories/siacoinoutput.recovery';
import { TransactionSignaturesRepository } from '../transactions/repositories/transaction-signature.recovery';
import { TransactionsRepository } from '../transactions/repositories/transaction.recovery';
import { BlocksRepository } from './repositories/block.repository';
import { SharedModule } from 'src/shared/shared.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SharedModule,
    // schedulemodule to detect and execute cron functions
    ScheduleModule.forRoot()
  ],
  providers: [
    BlockService,
    BlocksRepository,
    CoveredFieldsRepository,
    SiacoinOutputsRepository,
    TransactionSignaturesRepository,
    TransactionsRepository,
  ],
  controllers: [BlockController]
})
export class BlocksModule {}