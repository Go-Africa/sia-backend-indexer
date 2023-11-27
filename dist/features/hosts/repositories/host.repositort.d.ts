import { Logger } from '@nestjs/common';
import { Connection, PaginateModel } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { Host } from '../schemas/host.schema';
export declare class HostRepository extends AbstractRepository<Host> {
    protected readonly logger: Logger;
    constructor(hostModel: PaginateModel<Host>, connection: Connection);
}
