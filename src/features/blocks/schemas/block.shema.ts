import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { MinerPayout } from "./miner-payout.schema";
import { Transaction } from "src/features/transactions/schemas/transaction.shema";
import { BlockGetDTO } from "../dtos/block-get.dto";


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