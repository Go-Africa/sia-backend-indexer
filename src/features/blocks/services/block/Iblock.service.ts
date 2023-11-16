import { BlockGetDTO } from "../../dtos/block-get.dto";
import { BlockResponseDTO } from "../../dtos/block-response.dto";

export interface IBlockService {
    getBlocks();
    // getBlocks(): Promise<BlockResponseDTO[]>;
    getBlock(id: string): Promise<boolean>;
    // getBlock(id: string): BlockGetDTO;
}
