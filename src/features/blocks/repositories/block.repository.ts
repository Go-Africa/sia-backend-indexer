import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Block } from '../schemas/block.shema';
import { AbstractRepository } from 'src/shared/database/abstract.repository';

@Injectable()
export class BlocksRepository extends AbstractRepository<Block> {
  protected readonly logger = new Logger(BlocksRepository.name);

  constructor(
    @InjectModel(Block.name) blockModel: Model<Block>,
    @InjectConnection() connection: Connection,
  ) {
    super(blockModel, connection);
  }
}
