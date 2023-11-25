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
var SharedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedService = void 0;
const common_1 = require("@nestjs/common");
const https = require("https");
const common_2 = require("@nestjs/common");
const transaction_dto_1 = require("../../features/transactions/dtos/transaction.dto");
const transaction_shema_1 = require("../../features/transactions/schemas/transaction.shema");
const base_mapper_1 = require("../helpers/base.mapper");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const block_get_dto_1 = require("../../features/blocks/dtos/block-get.dto");
const block_repository_1 = require("../../features/blocks/repositories/block.repository");
const block_shema_1 = require("../../features/blocks/schemas/block.shema");
const transaction_recovery_1 = require("../../features/transactions/repositories/transaction.recovery");
let SharedService = SharedService_1 = class SharedService {
    constructor(httpService, blockRepository, transactionRepository) {
        this.httpService = httpService;
        this.blockRepository = blockRepository;
        this.transactionRepository = transactionRepository;
        this.baseUrl = process.env.RENTERD_BASE_URL;
        this.logger = new common_2.Logger(SharedService_1.name);
        this.httpAgent = new https.Agent({ rejectUnauthorized: false });
        this.getHeight();
    }
    async getHeight() {
        const url = `${this.baseUrl}/consensus`;
        const headers = { 'User-Agent': 'Sia-Agent' };
        try {
            this.logger.log("Checking consensus data");
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                headers,
                httpsAgent: this.httpAgent,
            }).pipe((0, rxjs_1.map)(resp => resp.data)));
            if (response.height) {
                this.currentBlockHeigh = response.height;
                this.previousBlock = response.height;
                console.log(response.height);
                const getPreviousBlock = async () => {
                    while (this.previousBlock >= 0) {
                        this.logger.log("Getting previous block at " + this.previousBlock);
                        const result = await this.getBlock(this.previousBlock.toString());
                        this.previousBlock--;
                    }
                };
                const getNextBlock = async () => {
                    while (true) {
                        this.logger.log("Getting next block at " + this.currentBlockHeigh);
                        const result = await this.getBlock(this.currentBlockHeigh.toString());
                        this.currentBlockHeigh++;
                    }
                };
                await Promise.all([getPreviousBlock(), getNextBlock()]);
            }
        }
        catch (error) {
            this.logger.error("Error fetching consensus data", error);
        }
    }
    async getBlock(height) {
        const url = `${this.baseUrl}/consensus/blocks?height=${height}`;
        const headers = { 'User-Agent': 'Sia-Agent' };
        try {
            const result = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                headers,
                httpsAgent: this.httpAgent,
            }).pipe((0, rxjs_1.map)(resp => resp.data)));
            const blockMapper = new base_mapper_1.BaseMapper(block_get_dto_1.BlockGetDTO, block_shema_1.Block);
            const savedBlock = blockMapper.toEntity(result);
            const transactionMapper = new base_mapper_1.BaseMapper(transaction_dto_1.TransactionDTO, transaction_shema_1.Transaction);
            const transactionsGet = result.transactions;
            const transactionPromises = transactionsGet.map(async (transaction) => {
                const toSaveTransaction = transactionMapper.toEntity(transaction);
                toSaveTransaction.height = result.height;
                toSaveTransaction.timestamp = result.timestamp;
                toSaveTransaction.siacoinoutputs = transaction.siacoinoutputs;
                try {
                    const savedTransaction = await this.transactionRepository.create(toSaveTransaction);
                    return savedTransaction.id;
                }
                catch (error) {
                    this.logger.error(typeof (error), error.message);
                    if (error.message.startsWith("E11000 duplicate key error collection:")) {
                        this.logger.log("Transaction " + transaction.id + " already added");
                    }
                    return null;
                }
            });
            const transactionIds = await Promise.all(transactionPromises);
            savedBlock.transactionId = transactionIds.filter(id => id !== null);
            try {
                const newBlock = await this.blockRepository.create(savedBlock);
                this.logger.log("Added block at height", newBlock.height);
                return true;
            }
            catch (error) {
                this.logger.error(typeof (error), error.message);
                if (error.message.startsWith("E11000 duplicate key error collection:")) {
                    this.logger.log("Block " + result.id + " already added");
                }
                return false;
            }
        }
        catch (fetchError) {
            this.logger.error("Error fetching block data: " + fetchError.message);
            return false;
        }
    }
};
SharedService = SharedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        block_repository_1.BlocksRepository,
        transaction_recovery_1.TransactionsRepository])
], SharedService);
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map