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
const https = require("https");
const block_repository_1 = require("../../repositories/block.repository");
let BlockService = BlockService_1 = class BlockService {
    constructor(blockRepository) {
        this.blockRepository = blockRepository;
        this.baseUrl = process.env.RENTERD_BASE_URL;
        this.httpAgent = new https.Agent({ rejectUnauthorized: false });
        this.logger = new common_1.Logger(BlockService_1.name);
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
    __metadata("design:paramtypes", [block_repository_1.BlocksRepository])
], BlockService);
exports.BlockService = BlockService;
//# sourceMappingURL=block.service.js.map