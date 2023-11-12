import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { CoveredField } from "./coveredfields.schema";


@Schema({ versionKey: false })
export class TransactionSignature extends AbstractDocument {
    @Prop()
    parentid: string;

    @Prop()
    publickeyindex: number;

    @Prop()
    timelock: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CoveredField' })
    coveredfields: CoveredField;

    @Prop()
    signature: string;

    // constructor(dto?: TransactionSignatureDTO) {
    //     super();
    //     if (dto) {
    //       Object.assign(this, dto);
    //       // Mettez à jour les propriétés spécifiques à cette classe ici
    //     }
    //   }
}


export const TransactionSignatureSchema = SchemaFactory.createForClass(TransactionSignature);