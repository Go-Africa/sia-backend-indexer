import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { SiacoinOutput } from '../schemas/siacoinoutput.shema';

@Injectable()
export class SiacoinOutputsRepository extends AbstractRepository<SiacoinOutput> {
  protected readonly logger = new Logger(SiacoinOutputsRepository.name);

  constructor(
    @InjectModel(SiacoinOutput.name) SiacoinOutputModel: Model<SiacoinOutput>,
    @InjectConnection() connection: Connection,
  ) {
    super(SiacoinOutputModel, connection);
  }
}
