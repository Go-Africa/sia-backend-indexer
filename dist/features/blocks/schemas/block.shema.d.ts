import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { MinerPayout } from "./miner-payout.schema";
import { Transaction } from "src/features/transactions/schemas/transaction.shema";
export declare class Block extends AbstractDocument {
    id: string;
    height: number;
    parentid: string;
    nonce: number[];
    difficulty: string;
    timestamp: number;
    minerpayouts: MinerPayout;
    transactions: Transaction;
}
export declare const BlockSchema: mongoose.Schema<Block, mongoose.Model<Block, any, any, any, mongoose.Document<unknown, any, Block> & Block & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Block, mongoose.Document<unknown, {}, mongoose.FlatRecord<Block>> & mongoose.FlatRecord<Block> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
