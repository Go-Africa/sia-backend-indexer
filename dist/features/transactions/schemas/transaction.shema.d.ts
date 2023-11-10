import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { SiacoinOutput } from "./siacoinoutput.shema";
export declare class Transaction extends AbstractDocument {
    id: string;
    siacoininputs: SiacoinOutput;
    siacoinoutputs: SiacoinOutput;
    filecontracts: string;
    filecontractrevisions: string;
    storageproofsstorageproofs: string;
    siafundinputs: string;
    siafundoutputs: string;
    minerfees: string[];
    arbitrarydata: string[];
    transactionsignatures: string;
}
export declare const TransactionSchema: mongoose.Schema<Transaction, mongoose.Model<Transaction, any, any, any, mongoose.Document<unknown, any, Transaction> & Transaction & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Transaction, mongoose.Document<unknown, {}, mongoose.FlatRecord<Transaction>> & mongoose.FlatRecord<Transaction> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
