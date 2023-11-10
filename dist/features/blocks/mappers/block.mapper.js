"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockMapper = void 0;
const base_mapper_1 = require("../../../shared/helpers/base.mapper");
const block_get_dto_1 = require("../dtos/block-get.dto");
const block_shema_1 = require("../schemas/block.shema");
const miner_mapper_1 = require("./miner.mapper");
class BlockMapper extends base_mapper_1.BaseMapper {
    constructor() {
        super(block_get_dto_1.BlockGetDTO, block_shema_1.Block);
        this.minerPayoutMapper = new miner_mapper_1.MinerPayoutMapper();
    }
    toDto(entity, options) {
        const dto = super.toDto(entity, options);
        dto.minerpayouts = this.minerPayoutMapper.toDto(entity.minerpayouts);
        return dto;
    }
}
exports.BlockMapper = BlockMapper;
//# sourceMappingURL=block.mapper.js.map