"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinerPayoutMapper = void 0;
const base_mapper_1 = require("../../../shared/helpers/base.mapper");
const miner_payout_dto_1 = require("../dtos/miner-payout.dto");
const miner_payout_schema_1 = require("../schemas/miner-payout.schema");
class MinerPayoutMapper extends base_mapper_1.BaseMapper {
    constructor() {
        super(miner_payout_dto_1.MinerPayoutDTO, miner_payout_schema_1.MinerPayout);
    }
}
exports.MinerPayoutMapper = MinerPayoutMapper;
//# sourceMappingURL=miner.mapper.js.map