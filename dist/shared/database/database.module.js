"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const block_shema_1 = require("../../features/blocks/schemas/block.shema");
const miner_payout_schema_1 = require("../../features/blocks/schemas/miner-payout.schema");
const host_schema_1 = require("../../features/hosts/schemas/host.schema");
const transaction_shema_1 = require("../../features/transactions/schemas/transaction.shema");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([{ name: block_shema_1.Block.name, schema: block_shema_1.BlockSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: miner_payout_schema_1.MinerPayout.name, schema: miner_payout_schema_1.MinerPayoutSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: transaction_shema_1.Transaction.name, schema: transaction_shema_1.TransactionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: host_schema_1.Host.name, schema: host_schema_1.HostSchema }]),
        ],
        exports: [
            mongoose_1.MongooseModule.forFeature([{ name: block_shema_1.Block.name, schema: block_shema_1.BlockSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: miner_payout_schema_1.MinerPayout.name, schema: miner_payout_schema_1.MinerPayoutSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: transaction_shema_1.Transaction.name, schema: transaction_shema_1.TransactionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: host_schema_1.Host.name, schema: host_schema_1.HostSchema }]),
        ]
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map