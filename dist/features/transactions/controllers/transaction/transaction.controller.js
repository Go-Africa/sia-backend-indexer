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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transaction_service_1 = require("../../services/transaction/transaction.service");
const transaction_response_dto_1 = require("../../dtos/transaction-response.dto");
let TransactionController = class TransactionController {
    constructor(_transactionService) {
        this._transactionService = _transactionService;
    }
    async getAllTransaction(page, limit) {
        const response = await this._transactionService.getTransactions(page, limit);
        return response;
    }
    async getOneTransaction(hash) {
        const response = await this._transactionService.getOneTransaction(hash);
        return response;
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully get all activitys', type: transaction_response_dto_1.TransactionResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, common_1.Get)('/get-all-transactions'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getAllTransaction", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully get all activitys', type: transaction_response_dto_1.TransactionResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, common_1.Get)('/get-one-transaction/:hash'),
    __param(0, (0, common_1.Param)("hash")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getOneTransaction", null);
TransactionController = __decorate([
    (0, swagger_1.ApiTags)('Transaction'),
    (0, common_1.Controller)('Transaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map