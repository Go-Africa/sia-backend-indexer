import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { MinerPayout } from "./miner-payout.schema";
import { BlockGetDTO } from "../dtos/block-get.dto";
import * as paginate from "mongoose-paginate-v2";


@Schema({ versionKey: false })
export class Block extends AbstractDocument {
    @Prop({unique: true})
    id: string;
  
    @Prop({unique: true})
    height: number;
  
    @Prop()
    parentid: string;
  
    @Prop([Number])
    nonce: number[];
  
    @Prop()
    difficulty: string;
  
    @Prop()
    timestamp: number;
  
    @Prop({ type: [String], required: true })
    transactionId: string[];
  
    @Prop([raw({
      value: {type: String},
      unlockhash: {type: String},
    })])
    minerpayouts: MinerPayout;
  
    // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }])
    // transactions: Transaction;
  
    constructor(dto?: BlockGetDTO) {
      super();
      if (dto) {
        Object.assign(this, dto);
        // Mettez à jour les propriétés spécifiques à cette classe ici
      }
    }
  }
  
export const BlockSchema = SchemaFactory.createForClass(Block);
BlockSchema.plugin(paginate);
BlockSchema.index({ timestamp: -1 });