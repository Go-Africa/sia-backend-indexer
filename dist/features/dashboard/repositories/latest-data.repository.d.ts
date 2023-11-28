import { Logger } from '@nestjs/common';
import { Connection, PaginateModel } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { LatestData } from '../schemas/latest-data.schema';
export declare class LatestDataRepository extends AbstractRepository<LatestData> {
    protected readonly logger: Logger;
    constructor(blockModel: PaginateModel<LatestData>, connection: Connection);
}
