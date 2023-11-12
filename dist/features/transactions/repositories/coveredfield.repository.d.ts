import { Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { CoveredField } from '../schemas/coveredfields.schema';
export declare class CoveredFieldsRepository extends AbstractRepository<CoveredField> {
    protected readonly logger: Logger;
    constructor(CoveredFieldModel: Model<CoveredField>, connection: Connection);
}
