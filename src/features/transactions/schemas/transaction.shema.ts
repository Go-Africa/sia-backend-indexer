import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { SiacoinOutput } from "./siacoinoutput.shema";
import { TransactionDTO } from "../dtos/transaction.dto";
import * as paginate from "mongoose-paginate-v2";


@Schema({ versionKey: false })
export class Transaction extends AbstractDocument {
    @Prop({unique: true})
    id: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SiacoinOutputSchema' })
    // siacoininputs: SiacoinOutput;

    @Prop([raw({
      id: {type: String},
      value: {type: String},
      unlockhash: {type: String},
    })])
    siacoinoutputs

    @Prop()
    height: number;

    @Prop({ default: Date.now }) // Champ createdAt avec une valeur par défaut de la date actuelle
    createdAt: Date;

    @Prop()
    timestamp: number;

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
TransactionSchema.plugin(paginate);
TransactionSchema.index({ timestamp: -1 });
TransactionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });