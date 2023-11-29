import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";

@Schema({ versionKey: false, timestamps: true })
export class LatestData extends AbstractDocument {
    @Prop()
    total_transaction: number;

    @Prop()
    total_hosts: number;

    @Prop()
    total_storage: number;

    @Prop()
    remaining_storage: number;

    @Prop()
    used_storage: number;

    @Prop()
    circulating_supply: number;

    @Prop()
    totat_supply: number;

    @Prop()
    price: number;

    @Prop()
    volume_24h: number;

    @Prop()
    volume_change_24h: number;

    @Prop()
    percent_change_1h: number;

    @Prop()
    percent_change_24h: number;

    @Prop()
    percent_change_7d: number;

    @Prop()
    percent_change_30d: number;

    @Prop()
    percent_change_60d: number;

    @Prop()
    percent_change_90d: number;

    @Prop()
    market_cap: number;

    @Prop()
    market_cap_dominance: number;

    @Prop()
    fully_diluted_market_cap: number;
}

export const LatestDataSchema = SchemaFactory.createForClass(LatestData);
LatestDataSchema.index({ createdAt: -1 });
