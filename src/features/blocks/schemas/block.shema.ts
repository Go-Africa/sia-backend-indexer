import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import { MinerPayout } from "./miner-payout.schema";
import { BlockGetDTO } from "../dtos/block-get.dto";
import * as paginate from "mongoose-paginate-v2";

@Schema({ versionKey: false })
export class Block extends AbstractDocument {
    @Prop({ unique: true })
    id: string;

    @Prop({ unique: true })
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
        value: { type: String },
        unlockhash: { type: String },
    })])
    minerpayouts: MinerPayout;

    @Prop({ default: Date.now }) // Champ createdAt avec une valeur par défaut de la date actuelle
    createdAt: Date;

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
BlockSchema.index({ createdAt: -1 }); // Index sur le champ createdAt pour accélérer les requêtes de tri
BlockSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 }); // Index d'expiration sur le champ createdAt pour conserver uniquement les 1000 derniers blocs pendant une semaine
