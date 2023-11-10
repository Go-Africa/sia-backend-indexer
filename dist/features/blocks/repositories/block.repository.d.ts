import { Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { Block } from '../schemas/block.shema';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
export declare class BlocksRepository extends AbstractRepository<Block> {
    protected readonly logger: Logger;
    constructor(blockModel: Model<Block>, connection: Connection);
}
