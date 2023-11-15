import { BlockGetDTO } from "../../dtos/block-get.dto";

export interface IBlockService {
    getBlocks(): BlockGetDTO[];
    getBlock(id: string): Promise<boolean>;
    // getBlock(id: string): BlockGetDTO;
}
