import { Logger } from '@nestjs/common';
import { Connection, PaginateModel } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { SiacoinOutput } from '../schemas/siacoinoutput.shema';
export declare class SiacoinOutputsRepository extends AbstractRepository<SiacoinOutput> {
    protected readonly logger: Logger;
    constructor(SiacoinOutputModel: PaginateModel<SiacoinOutput>, connection: Connection);
}
