import { IBlockService } from './Iblock.service';
import { BlockGetDTO } from '../../dtos/block-get.dto';
import { HttpService } from '@nestjs/axios';
export declare class BlockService implements IBlockService {
    private httpService;
    constructor(httpService: HttpService);
    getBlocks(): BlockGetDTO[];
    getBlock(height: string): Promise<void>;
}
