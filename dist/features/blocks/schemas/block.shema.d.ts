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
import { MinerPayout } from "./miner-payout.schema";
import { BlockGetDTO } from "../dtos/block-get.dto";
export declare class Block extends AbstractDocument {
    id: string;
    height: number;
    parentid: string;
    nonce: number[];
    difficulty: string;
    timestamp: number;
    transactionId: string[];
    minerpayouts: MinerPayout;
    constructor(dto?: BlockGetDTO);
}
export declare const BlockSchema: import("mongoose").Schema<Block, import("mongoose").Model<Block, any, any, any, import("mongoose").Document<unknown, any, Block> & Block & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Block, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Block>> & import("mongoose").FlatRecord<Block> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
