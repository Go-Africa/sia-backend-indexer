import { BlockGetDTO } from "../../dtos/block-get.dto";

export interface IBlockService {
    getBlocks(): BlockGetDTO[];
    getBlock(id: string): void;
    // getBlock(id: string): BlockGetDTO;
}
