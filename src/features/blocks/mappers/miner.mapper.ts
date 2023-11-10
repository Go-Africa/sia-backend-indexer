import { BaseMapper } from "src/shared/helpers/base.mapper";
import { MinerPayoutDTO } from "../dtos/miner-payout.dto";
import { MinerPayout } from "../schemas/miner-payout.schema";

export class MinerPayoutMapper extends BaseMapper<MinerPayoutDTO, MinerPayout> {
    constructor() {
      super(MinerPayoutDTO, MinerPayout);
    }
  }