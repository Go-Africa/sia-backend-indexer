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
let BlockService = BlockService_1 = class BlockService {
    constructor(httpService, blockRepository, transactionRepository) {
        this.httpService = httpService;
        this.blockRepository = blockRepository;
        this.transactionRepository = transactionRepository;
        this.baseUrl = process.env.RENTERD_BASE_URL;
        this.logger = new common_2.Logger(BlockService_1.name);
        this.getHeight();
    }
    async getBlocks(page, limit) {
        if (page < 1) {
            throw new common_1.HttpException("la page dois etre supérieur à 0.", common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const blocks = await this.blockRepository
                .findPaginate({}, page, limit);
            return blocks;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des blocs :', error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
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
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
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
    async getOneBlock(height) {
        const blockOfBD = await this.blockRepository.findOne({
            height: height
        }).catch((e) => {
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
BlockService = BlockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        block_repository_1.BlocksRepository,
        transaction_recovery_1.TransactionsRepository])
], BlockService);
exports.BlockService = BlockService;
//# sourceMappingURL=block.service.js.map