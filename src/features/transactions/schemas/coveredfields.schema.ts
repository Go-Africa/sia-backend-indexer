import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { SiacoinOutput } from "./siacoinoutput.shema";
import { TransactionSignature } from "./transaction-signature.schema";


@Schema({ versionKey: false })
export class CoveredField extends AbstractDocument {
    @Prop()
    wholetransaction: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SiacoinOutputSchema' })
    siacoininputs: SiacoinOutput;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SiacoinOutputSchema' })
    siacoinoutputs: SiacoinOutput;

    @Prop()
    filecontracts: string;

    @Prop()
    filecontractrevisions: string;

    @Prop()
    storageproofs: string;

    @Prop()
    siafundinputs: string;

    @Prop()
    siafundoutputs: string;

    @Prop([String])
    minerfees: string[];

    @Prop([String])
    arbitrarydata: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TransactionSignature' })
    transactionsignatures: TransactionSignature;
}

export const CoveredFieldSchema = SchemaFactory.createForClass(CoveredField);