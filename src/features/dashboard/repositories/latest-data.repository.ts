import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, PaginateModel } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { LatestData } from '../schemas/latest-data.schema';

@Injectable()
export class LatestDataRepository extends AbstractRepository<LatestData> {
  protected readonly logger = new Logger(LatestDataRepository.name);

  constructor(
    @InjectModel(LatestData.name) blockModel: PaginateModel<LatestData>,
    @InjectConnection() connection: Connection,
  ) {
    super(blockModel, connection);
  }
}
