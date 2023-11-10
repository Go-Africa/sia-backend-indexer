import { BaseMapper, BaseMapperOptions } from "src/shared/helpers/base.mapper";
import { BlockGetDTO } from "../dtos/block-get.dto";
import { Block } from "../schemas/block.shema";
export declare class BlockMapper extends BaseMapper<BlockGetDTO, Block> {
    private minerPayoutMapper;
    constructor();
    toDto(entity: Block, options?: BaseMapperOptions): BlockGetDTO;
}
