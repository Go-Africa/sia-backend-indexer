export interface IBlockService {
    getBlocks(): any;
    getOneBlock(height: string): any;
    getBlock(id: string): Promise<boolean>;
}
