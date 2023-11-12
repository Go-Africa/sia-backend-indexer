"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinerPayoutSchema = exports.MinerPayout = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const abstract_schema_1 = require("../../../shared/database/abstract.schema");
const miner_payout_dto_1 = require("../dtos/miner-payout.dto");
let MinerPayout = class MinerPayout extends abstract_schema_1.AbstractDocument {
    constructor(dto) {
        super();
        if (dto) {
            Object.assign(this, dto);
        }
    }
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MinerPayout.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MinerPayout.prototype, "unlockhash", void 0);
MinerPayout = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false }),
    __metadata("design:paramtypes", [miner_payout_dto_1.MinerPayoutDTO])
], MinerPayout);
exports.MinerPayout = MinerPayout;
exports.MinerPayoutSchema = mongoose_1.SchemaFactory.createForClass(MinerPayout);
//# sourceMappingURL=miner-payout.schema.js.map