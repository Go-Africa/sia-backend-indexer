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
import { MinerPayoutDTO } from "../dtos/miner-payout.dto";
export declare class MinerPayout extends AbstractDocument {
    value: string;
    unlockhash: string;
    constructor(dto?: MinerPayoutDTO);
}
export declare const MinerPayoutSchema: import("mongoose").Schema<MinerPayout, import("mongoose").Model<MinerPayout, any, any, any, import("mongoose").Document<unknown, any, MinerPayout> & MinerPayout & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MinerPayout, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<MinerPayout>> & import("mongoose").FlatRecord<MinerPayout> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
