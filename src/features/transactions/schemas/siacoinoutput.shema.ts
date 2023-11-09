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
}

export const SiacoinOutputSchema = SchemaFactory.createForClass(SiacoinOutput);