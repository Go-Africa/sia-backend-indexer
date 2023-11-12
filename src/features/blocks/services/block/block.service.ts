import { Injectable } from '@nestjs/common';
import { IBlockService } from './Iblock.service';
import { BlockGetDTO } from '../../dtos/block-get.dto';
import { HttpService } from '@nestjs/axios';
import * as https from 'https'
import { lastValueFrom, map } from 'rxjs';
import { BlocksRepository } from '../../repositories/block.repository';
import { TransactionsRepository } from 'src/features/transactions/repositories/transaction.recovery';
import { SiacoinOutputDTO } from 'src/features/transactions/dtos/siacoinoutput.dto';
import { BaseMapper } from 'src/shared/helpers/base.mapper';
import { Block } from '../../schemas/block.shema';

import { Logger } from '@nestjs/common';
import { TransactionDTO } from 'src/features/transactions/dtos/transaction.dto';
import { Transaction } from 'src/features/transactions/schemas/transaction.shema';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BlockService implements IBlockService {

    constructor(
        private httpService: HttpService,
        private readonly blockRepository: BlocksRepository,
        private readonly transactionRepository: TransactionsRepository,
    ) {
        this.getBlock("20032")
        // this.subscribe()
    }
    getBlocks(): BlockGetDTO[] {
        throw new Error('Method not implemented.');
    }

    private readonly logger = new Logger(BlockService.name);

      // set cron ton execute request every day
    @Cron(CronExpression.EVERY_5_SECONDS)
    async getBlock(height: string) {
        const test = new SiacoinOutputDTO();
        const url = `https://f33d-54-198-46-109.ngrok-free.app/consensus/blocks?height=${height}`;
        const headers = { 'User-Agent': 'Sia-Agent' };
        var result = new BlockGetDTO();
        result = await lastValueFrom(
            this.httpService.get(url, {
                headers,
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }).pipe(
                map(resp => resp.data)
            )
        );
        this.logger.log("adding new block...");
        const blockMapper = new BaseMapper<BlockGetDTO, Block>(BlockGetDTO, Block);
        const savedBlock = blockMapper.toEntity(result);
        const newBlock = await this.blockRepository.create(savedBlock)
            .then(result => {
                this.logger.log("added block ", result.id);
            })
            .catch(error => {
                this.logger.error(error.message);
            });

        const transactionMapper = new BaseMapper<TransactionDTO, Transaction>(TransactionDTO, Transaction);
        const transactionsGet = result.transactions;
        transactionsGet.map(async transaction => {
            const toSaveTransaction = transactionMapper.toEntity(transaction);
            this.logger.log("adding new transaction...");
            const savedTransaction = await this.transactionRepository.create(toSaveTransaction)
                .then(result => {
                    this.logger.log("added transaction ", result.id);
                })
                .catch(err => {
                    this.logger.error(err.message);
                });
            this.logger.log("new transaction added to database", savedTransaction);
        })

    }
}
