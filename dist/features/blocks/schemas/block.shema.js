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
exports.BlockSchema = exports.Block = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const abstract_schema_1 = require("../../../shared/database/abstract.schema");
const miner_payout_schema_1 = require("./miner-payout.schema");
const block_get_dto_1 = require("../dtos/block-get.dto");
const paginate = require("mongoose-paginate-v2");
let Block = class Block extends abstract_schema_1.AbstractDocument {
    constructor(dto) {
        super();
        if (dto) {
            Object.assign(this, dto);
        }
    }
};
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], Block.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", Number)
], Block.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Block.prototype, "parentid", void 0);
__decorate([
    (0, mongoose_1.Prop)([Number]),
    __metadata("design:type", Array)
], Block.prototype, "nonce", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Block.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Block.prototype, "timestamp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Block.prototype, "transactionId", void 0);
__decorate([
    (0, mongoose_1.Prop)([(0, mongoose_1.raw)({
            value: { type: String },
            unlockhash: { type: String },
        })]),
    __metadata("design:type", miner_payout_schema_1.MinerPayout)
], Block.prototype, "minerpayouts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Block.prototype, "createdAt", void 0);
Block = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false }),
    __metadata("design:paramtypes", [block_get_dto_1.BlockGetDTO])
], Block);
exports.Block = Block;
exports.BlockSchema = mongoose_1.SchemaFactory.createForClass(Block);
exports.BlockSchema.plugin(paginate);
exports.BlockSchema.index({ createdAt: -1 });
exports.BlockSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });
//# sourceMappingURL=block.shema.js.map