import { Module } from '@nestjs/common';
import { BlockService } from './services/block/block.service';
import { BlockController } from './controllers/block/block.controller';
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
  ],
  controllers: [BlockController]
})
export class BlocksModule {}