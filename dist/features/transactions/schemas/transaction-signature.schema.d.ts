import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { CoveredField } from "./coveredfields.schema";
export declare class TransactionSignature extends AbstractDocument {
    parentid: string;
    publickeyindex: number;
    timelock: number;
    coveredfields: CoveredField;
    signature: string;
}
export declare const TransactionSignatureSchema: mongoose.Schema<TransactionSignature, mongoose.Model<TransactionSignature, any, any, any, mongoose.Document<unknown, any, TransactionSignature> & TransactionSignature & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TransactionSignature, mongoose.Document<unknown, {}, mongoose.FlatRecord<TransactionSignature>> & mongoose.FlatRecord<TransactionSignature> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
