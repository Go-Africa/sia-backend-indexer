import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { SiacoinOutput } from "./siacoinoutput.shema";


@Schema({ versionKey: false })
export class Transaction extends AbstractDocument {
    @Prop()
    id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SiacoinOutputSchema' })
    siacoininputs: SiacoinOutput;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SiacoinOutputSchema' })
    siacoinoutputs: SiacoinOutput;

    @Prop()
    filecontracts: string;

    @Prop()
    filecontractrevisions: string;

    @Prop()
    storageproofsstorageproofs: string;

    @Prop()
    siafundinputs: string;

    @Prop()
    siafundoutputs: string;

    @Prop([String])
    minerfees: string[];

    @Prop([String])
    arbitrarydata: string[];

    @Prop()
    transactionsignatures: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);