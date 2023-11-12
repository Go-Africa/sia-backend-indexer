import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { MinerPayoutDTO } from "../dtos/miner-payout.dto";


@Schema({ versionKey: false })
export class MinerPayout extends AbstractDocument {
    @Prop()
    value: string;
  
    @Prop()
    unlockhash: string;
  
    constructor(dto?: MinerPayoutDTO) {
      super();
      if (dto) {
        Object.assign(this, dto);
        // Mettez à jour les propriétés spécifiques à cette classe ici
      }
    }
  }
  

export const MinerPayoutSchema = SchemaFactory.createForClass(MinerPayout);
