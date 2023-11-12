import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { SiacoinOutput } from "./siacoinoutput.shema";
import { TransactionDTO } from "../dtos/transaction.dto";
export declare class Transaction extends AbstractDocument {
    id: string;
    siacoinoutputs: SiacoinOutput;
    minerfees: string[];
    arbitrarydata: string[];
    constructor(dto?: TransactionDTO);
}
export declare const TransactionSchema: mongoose.Schema<Transaction, mongoose.Model<Transaction, any, any, any, mongoose.Document<unknown, any, Transaction> & Transaction & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Transaction, mongoose.Document<unknown, {}, mongoose.FlatRecord<Transaction>> & mongoose.FlatRecord<Transaction> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
