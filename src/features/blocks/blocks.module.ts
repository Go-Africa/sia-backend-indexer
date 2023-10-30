import { Module } from '@nestjs/common';
import { BlockService } from './services/block/block.service';
import { BlockController } from './controllers/block/block.controller';

@Module({
  providers: [BlockService],
  controllers: [BlockController]
})
export class BlocksModule {}