import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";


@Schema({ versionKey: false })
export class SiacoinOutput extends AbstractDocument {
    @Prop()
    id: string;
  
    @Prop()
    value: string;
  
    @Prop()
    unlockhash: string;
  
    constructor(dto?: SiacoinOutput) {
      super();
      if (dto) {
        Object.assign(this, dto);
        // Mettez à jour les propriétés spécifiques à cette classe ici
      }
    }
  }
  

export const SiacoinOutputSchema = SchemaFactory.createForClass(SiacoinOutput);