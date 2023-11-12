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
var BlockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockService = void 0;
const common_1 = require("@nestjs/common");
const block_get_dto_1 = require("../../dtos/block-get.dto");
const axios_1 = require("@nestjs/axios");
const https = require("https");
const rxjs_1 = require("rxjs");
const block_repository_1 = require("../../repositories/block.repository");
const transaction_recovery_1 = require("../../../transactions/repositories/transaction.recovery");
const siacoinoutput_dto_1 = require("../../../transactions/dtos/siacoinoutput.dto");
const base_mapper_1 = require("../../../../shared/helpers/base.mapper");
const block_shema_1 = require("../../schemas/block.shema");
const common_2 = require("@nestjs/common");
const transaction_dto_1 = require("../../../transactions/dtos/transaction.dto");
const transaction_shema_1 = require("../../../transactions/schemas/transaction.shema");
const schedule_1 = require("@nestjs/schedule");
let BlockService = BlockService_1 = class BlockService {
    constructor(httpService, blockRepository, transactionRepository) {
        this.httpService = httpService;
        this.blockRepository = blockRepository;
        this.transactionRepository = transactionRepository;
        this.logger = new common_2.Logger(BlockService_1.name);
        this.getBlock("20032");
    }
    getBlocks() {
        throw new Error('Method not implemented.');
    }
    async getBlock(height) {
        const test = new siacoinoutput_dto_1.SiacoinOutputDTO();
        const url = `https://f33d-54-198-46-109.ngrok-free.app/consensus/blocks?height=${height}`;
        const headers = { 'User-Agent': 'Sia-Agent' };
        var result = new block_get_dto_1.BlockGetDTO();
        result = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
            headers,
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }).pipe((0, rxjs_1.map)(resp => resp.data)));
        this.logger.log("adding new block...");
        const blockMapper = new base_mapper_1.BaseMapper(block_get_dto_1.BlockGetDTO, block_shema_1.Block);
        const savedBlock = blockMapper.toEntity(result);
        const newBlock = await this.blockRepository.create(savedBlock)
            .then(result => {
            this.logger.log("added block ", result.id);
        })
            .catch(error => {
            this.logger.error(error.message);
        });
        const transactionMapper = new base_mapper_1.BaseMapper(transaction_dto_1.TransactionDTO, transaction_shema_1.Transaction);
        const transactionsGet = result.transactions;
        transactionsGet.map(async (transaction) => {
            const toSaveTransaction = transactionMapper.toEntity(transaction);
            this.logger.log("adding new transaction...");
            const savedTransaction = await this.transactionRepository.create(toSaveTransaction)
                .then(result => {
                this.logger.log("added transaction ", result.id);
            })
                .catch(err => {
                this.logger.error(err.message);
            });
            this.logger.log("new transaction added to database", savedTransaction);
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlockService.prototype, "getBlock", null);
BlockService = BlockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        block_repository_1.BlocksRepository,
        transaction_recovery_1.TransactionsRepository])
], BlockService);
exports.BlockService = BlockService;
//# sourceMappingURL=block.service.js.map