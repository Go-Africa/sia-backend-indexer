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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const block_service_1 = require("../../services/block/block.service");
const block_response_dto_1 = require("../../dtos/block-response.dto");
let BlockController = class BlockController {
    constructor(_blockService) {
        this._blockService = _blockService;
    }
    async getAllactivity(page, limit, offset) {
        const response = await this._blockService.getBlocks(offset, page, limit);
        return response;
    }
    async getOneBlock(height) {
        const response = await this._blockService.getOneBlock(height);
        return response;
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully get all activitys', type: block_response_dto_1.BlockResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false }),
    (0, common_1.Get)('/get-all-blocks'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "getAllactivity", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully get all activitys', type: block_response_dto_1.BlockResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, common_1.Get)('/get-one-block/:height'),
    __param(0, (0, common_1.Param)("height")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "getOneBlock", null);
BlockController = __decorate([
    (0, swagger_1.ApiTags)('block'),
    (0, common_1.Controller)('block'),
    __metadata("design:paramtypes", [block_service_1.BlockService])
], BlockController);
exports.BlockController = BlockController;
//# sourceMappingURL=block.controller.js.map