import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { SiacoinOutput } from "./siacoinoutput.shema";
import { TransactionSignature } from "./transaction-signature.schema";
export declare class CoveredField extends AbstractDocument {
    wholetransaction: string;
    siacoininputs: SiacoinOutput;
    siacoinoutputs: SiacoinOutput;
    filecontracts: string;
    filecontractrevisions: string;
    storageproofs: string;
    siafundinputs: string;
    siafundoutputs: string;
    minerfees: string[];
    arbitrarydata: string[];
    transactionsignatures: TransactionSignature;
}
export declare const CoveredFieldSchema: mongoose.Schema<CoveredField, mongoose.Model<CoveredField, any, any, any, mongoose.Document<unknown, any, CoveredField> & CoveredField & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CoveredField, mongoose.Document<unknown, {}, mongoose.FlatRecord<CoveredField>> & mongoose.FlatRecord<CoveredField> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
