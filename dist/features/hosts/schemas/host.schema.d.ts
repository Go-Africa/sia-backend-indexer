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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-paginate-v2" />
import { AbstractDocument } from "src/shared/database/abstract.schema";
export declare class Host extends AbstractDocument {
    knownSince: string;
    publicKey: string;
    lastAnnouncement: string;
    netAddress: string;
    priceTable: Record<string, any>;
    settings: Record<string, any>;
    interactions: Record<string, any>;
    scanned: boolean;
}
export declare const HostSchema: import("mongoose").Schema<Host, import("mongoose").Model<Host, any, any, any, import("mongoose").Document<unknown, any, Host> & Host & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Host, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Host>> & import("mongoose").FlatRecord<Host> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
