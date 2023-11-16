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
const base_mapper_1 = require("../../../../shared/helpers/base.mapper");
const block_shema_1 = require("../../schemas/block.shema");
const common_2 = require("@nestjs/common");
const transaction_dto_1 = require("../../../transactions/dtos/transaction.dto");
const transaction_shema_1 = require("../../../transactions/schemas/transaction.shema");
const schedule_1 = require("@nestjs/schedule");
const console_1 = require("console");
let BlockService = BlockService_1 = class BlockService {
    constructor(httpService, blockRepository, transactionRepository) {
        this.httpService = httpService;
        this.blockRepository = blockRepository;
        this.transactionRepository = transactionRepository;
        this.baseUrl = process.env.RENTERD_BASE_URL;
        this.logger = new common_2.Logger(BlockService_1.name);
        this.getHeight();
    }
    async getBlocks(offset = 0, page = 0, limit = 10) {
        try {
            const blocks = await this.blockRepository
                .findPaginate({}, offset, page, limit);
            (0, console_1.log)("result", blocks);
            return blocks;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des blocs :', error);
            throw new Error('Erreur lors de la récupération des blocs.');
        }
    }
    async getHeight() {
        const url = `${this.baseUrl}/consensus`;
        const headers = { 'User-Agent': 'Sia-Agent' };
        try {
            this.logger.log("Checking consensus data");
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                headers,
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            }).pipe((0, rxjs_1.map)(resp => resp.data)));
            if (response.height) {
                this.currentBlockHeigh = response.height;
                this.previousBlock = response.height;
                const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
                await this.getNextBlock();
                await sleep(30000);
                await this.getPreviousBlock();
                this.logger.log("Result", response);
            }
        }
        catch (error) {
            this.logger.error("Error fetching consensus data", error);
        }
    }
    async getNextBlock() {
        this.logger.log("Getting previous block at " + this.previousBlock);
        if (this.previousBlock <= 0) {
            return;
        }
        const result = await this.getBlock(this.previousBlock.toString());
        if (result) {
            this.previousBlock--;
        }
    }
    async getPreviousBlock() {
        this.logger.log("Getting next block at " + this.currentBlockHeigh);
        const result = await this.getBlock(this.currentBlockHeigh.toString());
        if (result) {
            this.currentBlockHeigh++;
        }
    }
    async getBlock(height) {
        const blockOfBD = await this.blockRepository.findOne({
            height: height
        }).catch((e) => {
            (0, console_1.log)(e.message);
        });
        if (!blockOfBD) {
            const url = `${this.baseUrl}/consensus/blocks?height=${height}`;
            const headers = { 'User-Agent': 'Sia-Agent' };
            var result = new block_get_dto_1.BlockGetDTO();
            try {
                result = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                    headers,
                    httpsAgent: new https.Agent({ rejectUnauthorized: false })
                }).pipe((0, rxjs_1.map)(resp => resp.data)));
            }
            catch (fetchError) {
                this.logger.error("Error fetching block data: " + fetchError.message);
                return;
            }
            const blockMapper = new base_mapper_1.BaseMapper(block_get_dto_1.BlockGetDTO, block_shema_1.Block);
            const savedBlock = blockMapper.toEntity(result);
            this.logger.log("adding new block... at " + height);
            const transactionIds = [];
            const transactionMapper = new base_mapper_1.BaseMapper(transaction_dto_1.TransactionDTO, transaction_shema_1.Transaction);
            const transactionsGet = result.transactions;
            for (let index = 0; index < transactionsGet.length; index++) {
                const transaction = transactionsGet[index];
                const toSaveTransaction = transactionMapper.toEntity(transaction);
                const transactionOfBD = await this.transactionRepository.findOne({
                    id: transaction.id
                }).catch((e) => {
                    (0, console_1.log)(e.message);
                });
                if (!transactionOfBD) {
                    toSaveTransaction.height = result.height;
                    const savedTransaction = await this.transactionRepository.create(toSaveTransaction)
                        .then(result => {
                        transactionIds.push(result.id);
                    })
                        .catch(err => {
                        this.logger.error(typeof (err), err.message);
                    });
                }
            }
            savedBlock.transactionId = transactionIds;
            const newBlock = await this.blockRepository.create(savedBlock)
                .then(result => {
                this.logger.log("added block ", result.id);
                return true;
            })
                .catch(error => {
                this.logger.error(typeof (error), error.message);
                if (error.message.startsWith("E11000 duplicate key error collection:")) {
                    this.logger.log("transaction " + result.id + " already added");
                    return true;
                }
                return false;
            });
        }
        else {
            this.logger.log("block " + height + " already added");
            return true;
        }
    }
    async getOneBlock(height) {
        const blockOfBD = await this.blockRepository.findOne({
            height: height
        }).catch((e) => {
            (0, console_1.log)(e.message);
        });
        if (!blockOfBD) {
            throw new common_1.HttpException("This block doen't exist", common_1.HttpStatus.NOT_FOUND);
        }
        else {
            this.logger.log("block " + height + " already added");
            return blockOfBD;
        }
    }
};
__decorate([
    (0, schedule_1.Cron)("*/1 * * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockService.prototype, "getNextBlock", null);
__decorate([
    (0, schedule_1.Cron)("*/1 * * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockService.prototype, "getPreviousBlock", null);
BlockService = BlockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        block_repository_1.BlocksRepository,
        transaction_recovery_1.TransactionsRepository])
], BlockService);
exports.BlockService = BlockService;
//# sourceMappingURL=block.service.js.map