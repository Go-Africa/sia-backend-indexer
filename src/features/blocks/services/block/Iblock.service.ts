

export interface IBlockService {
    getBlocks();
    getOneBlock(height: string);
    // getBlocks(): Promise<BlockResponseDTO[]>;
    getBlock(id: string): Promise<boolean>;
    // getBlock(id: string): BlockGetDTO;
}
