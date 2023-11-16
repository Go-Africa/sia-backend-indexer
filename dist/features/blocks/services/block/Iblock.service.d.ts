export interface IBlockService {
    getBlocks(): any;
    getBlock(id: string): Promise<boolean>;
}
