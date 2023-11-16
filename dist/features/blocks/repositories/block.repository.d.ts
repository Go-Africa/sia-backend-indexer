import { Logger } from '@nestjs/common';
import { Connection, PaginateModel } from 'mongoose';
import { Block } from '../schemas/block.shema';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
export declare class BlocksRepository extends AbstractRepository<Block> {
    protected readonly logger: Logger;
    constructor(blockModel: PaginateModel<Block>, connection: Connection);
}
