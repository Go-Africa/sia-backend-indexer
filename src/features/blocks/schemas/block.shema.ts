import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { MinerPayout } from "./miner-payout.schema";
import { Transaction } from "src/features/transactions/schemas/transaction.shema";


@Schema({ versionKey: false })
export class Block extends AbstractDocument {
    @Prop()
    id: string;

    @Prop()
    height: number;

    @Prop()
    parentid: string;

    @Prop([Number])
    nonce: number[];

    @Prop()
    difficulty: string;

    @Prop()
    timestamp: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MinerPayout' })
    minerpayouts: MinerPayout

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }])
    transactions: Transaction
}

export const BlockSchema = SchemaFactory.createForClass(Block);