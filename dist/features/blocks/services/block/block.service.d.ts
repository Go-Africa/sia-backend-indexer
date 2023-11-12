import { IBlockService } from './Iblock.service';
import { BlockGetDTO } from '../../dtos/block-get.dto';
import { HttpService } from '@nestjs/axios';
import { BlocksRepository } from '../../repositories/block.repository';
import { TransactionsRepository } from 'src/features/transactions/repositories/transaction.recovery';
export declare class BlockService implements IBlockService {
    private httpService;
    private readonly blockRepository;
    private readonly transactionRepository;
    constructor(httpService: HttpService, blockRepository: BlocksRepository, transactionRepository: TransactionsRepository);
    getBlocks(): BlockGetDTO[];
    private readonly logger;
    getBlock(height: string): Promise<void>;
}
