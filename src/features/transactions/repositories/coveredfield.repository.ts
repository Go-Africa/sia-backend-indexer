import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, PaginateModel } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { CoveredField } from '../schemas/coveredfields.schema';

@Injectable()
export class CoveredFieldsRepository extends AbstractRepository<CoveredField> {
  protected readonly logger = new Logger(CoveredFieldsRepository.name);

  constructor(
    @InjectModel(CoveredField.name) CoveredFieldModel: PaginateModel<CoveredField>,
    @InjectConnection() connection: Connection,
  ) {
    super(CoveredFieldModel, connection);
  }
}
