import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { SiacoinOutput } from "./siacoinoutput.shema";
import { TransactionDTO } from "../dtos/transaction.dto";


@Schema({ versionKey: false })
export class Transaction extends AbstractDocument {
    @Prop()
    id: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SiacoinOutputSchema' })
    // siacoininputs: SiacoinOutput;

    @Prop([raw({
      id: {type: String},
      value: {type: String},
      unlockhash: {type: String},
    })])
    siacoinoutputs: SiacoinOutput;

    // @Prop()
    // filecontracts: string;

    // @Prop()
    // filecontractrevisions: string;

    // @Prop()
    // storageproofsstorageproofs: string;

    // @Prop()
    // siafundinputs: string;

    // @Prop()
    // siafundoutputs: string;

    @Prop([String])
    minerfees: string[];

    @Prop([String])
    arbitrarydata: string[];

    // @Prop()
    // transactionsignatures: string;

    constructor(dto?: TransactionDTO) {
        super();
        if (dto) {
          Object.assign(this, dto);
          // Mettez à jour les propriétés spécifiques à cette classe ici
        }
      }

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);