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
var BlocksRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocksRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const block_shema_1 = require("../schemas/block.shema");
const abstract_repository_1 = require("../../../shared/database/abstract.repository");
let BlocksRepository = BlocksRepository_1 = class BlocksRepository extends abstract_repository_1.AbstractRepository {
    constructor(blockModel, connection) {
        super(blockModel, connection);
        this.logger = new common_1.Logger(BlocksRepository_1.name);
    }
};
BlocksRepository = BlocksRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(block_shema_1.Block.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection])
], BlocksRepository);
exports.BlocksRepository = BlocksRepository;
//# sourceMappingURL=block.repository.js.map