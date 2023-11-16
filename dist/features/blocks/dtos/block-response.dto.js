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
exports.BlockResponseDTO = void 0;
const miner_payout_dto_1 = require("./miner-payout.dto");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
class BlockResponseDTO {
    ;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BlockResponseDTO.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlockResponseDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlockResponseDTO.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlockResponseDTO.prototype, "parentid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], BlockResponseDTO.prototype, "nonce", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BlockResponseDTO.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BlockResponseDTO.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", miner_payout_dto_1.MinerPayoutDTO)
], BlockResponseDTO.prototype, "minerpayouts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], BlockResponseDTO.prototype, "transactionId", void 0);
exports.BlockResponseDTO = BlockResponseDTO;
//# sourceMappingURL=block-response.dto.js.map