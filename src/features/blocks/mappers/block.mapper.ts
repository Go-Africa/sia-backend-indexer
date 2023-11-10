import { BaseMapper, BaseMapperOptions } from "src/shared/helpers/base.mapper";
import { BlockGetDTO } from "../dtos/block-get.dto";
import { Block } from "../schemas/block.shema";
import { MinerPayoutMapper } from "./miner.mapper";

export class BlockMapper extends BaseMapper<BlockGetDTO, Block> {
    private minerPayoutMapper: MinerPayoutMapper;
  
    constructor() {
      super(BlockGetDTO, Block);
      this.minerPayoutMapper = new MinerPayoutMapper();
    }
  
    toDto(entity: Block, options?: BaseMapperOptions): BlockGetDTO {
      const dto = super.toDto(entity, options);
  
      // Map MinerPayout using MinerPayoutMapper
      dto.minerpayouts = this.minerPayoutMapper.toDto(entity.minerpayouts);
  
      // Map additional properties specific to BlockDTO if needed
  
      return dto;
    }
  }
  