import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";


@Schema({ versionKey: false })
export class MinerPayout extends AbstractDocument {
    @Prop()
    value: string;

    @Prop()
    unlockhash: string;
}

export const MinerPayoutSchema = SchemaFactory.createForClass(MinerPayout);
