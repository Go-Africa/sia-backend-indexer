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
exports.TransactionService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const transaction_recovery_1 = require("../../repositories/transaction.recovery");
let TransactionService = class TransactionService {
    constructor(httpService, transactionRepository) {
        this.httpService = httpService;
        this.transactionRepository = transactionRepository;
        this.baseUrl = process.env.RENTERD_BASE_URL;
    }
    async getTransactions(page, limit) {
        if (page < 1) {
            throw new common_1.HttpException("la page dois etre supérieur à 0.", common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const transactions = await this.transactionRepository
                .findPaginate({}, page, limit);
            return transactions;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des transactions :', error);
            throw new common_1.HttpException("Erreur lors de la récupération des transactions.", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getOneTransaction(id) {
        const transactionOfBD = await this.transactionRepository.findOne({
            id: id
        }).catch((e) => {
            (0, console_1.log)(e.message);
        });
        if (!transactionOfBD) {
            throw new common_1.HttpException("This transaction doen't exist", common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return transactionOfBD;
        }
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        transaction_recovery_1.TransactionsRepository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map