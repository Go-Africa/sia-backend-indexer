import { Logger } from '@nestjs/common';
import { FilterQuery, UpdateQuery, SaveOptions, Connection, PaginateModel } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
export declare abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected readonly model: PaginateModel<TDocument>;
    private readonly connection;
    protected abstract readonly logger: Logger;
    constructor(model: PaginateModel<TDocument>, connection: Connection);
    create(document: Omit<TDocument, '_id'>, options?: SaveOptions): Promise<TDocument>;
    findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>;
    findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>>;
    upsert(filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>): Promise<TDocument extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>>;
    findPaginate(filterQuery: FilterQuery<TDocument>, page?: number, limit?: number): Promise<{
        docs: import("mongoose").IfAny<TDocument, any, import("mongoose").Document<unknown, {}, TDocument> & import("mongoose").Require_id<TDocument>>[];
        totalDocs: number;
        limit: number;
        page: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    }>;
    startTransaction(): Promise<import("mongodb").ClientSession>;
}
