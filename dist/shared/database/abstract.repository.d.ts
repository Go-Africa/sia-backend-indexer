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
import { Logger } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery, SaveOptions, Connection } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
export declare abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected readonly model: Model<TDocument>;
    private readonly connection;
    protected abstract readonly logger: Logger;
    constructor(model: Model<TDocument>, connection: Connection);
    create(document: Omit<TDocument, '_id'>, options?: SaveOptions): Promise<TDocument>;
    findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>;
    findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>>;
    upsert(filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>): Promise<TDocument extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>>;
    find(filterQuery: FilterQuery<TDocument>): Promise<import("mongoose").Require_id<import("mongoose").FlattenMaps<TDocument>>[]>;
    startTransaction(): Promise<import("mongodb").ClientSession>;
}
