/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-paginate-v2" />
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
    find(filterQuery: FilterQuery<TDocument>): Promise<import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>[]>;
    findPaginate(filterQuery: FilterQuery<TDocument>, offset?: number, page?: number, limit?: number): Promise<import("mongoose").PaginateResult<import("mongoose").IfAny<TDocument, any, import("mongoose").Document<unknown, {
        customLabels: {
            docs: string;
            page: string;
            totalPages: string;
            limit: string;
            totalDocs: string;
        };
        offset: number;
        limit: number;
        page: number;
        sort: {
            timestamp: number;
        };
    }, TDocument> & import("mongoose").Require_id<TDocument>>>>;
    startTransaction(): Promise<import("mongodb").ClientSession>;
}
