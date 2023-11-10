import { Injectable } from '@nestjs/common';
import { IBlockService } from './Iblock.service';
import { BlockGetDTO } from '../../dtos/block-get.dto';
import { HttpService } from '@nestjs/axios';
import { Request as RequestExpress, Response } from 'express';
import * as https from 'https'
import { AxiosResponse } from 'axios';
import { log } from 'console';
import { lastValueFrom, map } from 'rxjs';
import { ed25519 } from 'bcrypto';
import { BlocksRepository } from '../../repositories/block.repository';

@Injectable()
export class BlockService implements IBlockService {

    constructor(
        private httpService: HttpService,
        // private readonly blockRepository: BlocksRepository,

    ) {
        this.getBlock("20032")
    }
    getBlocks(): BlockGetDTO[] {
        throw new Error('Method not implemented.');
    }


    async getBlock(height: string) {
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
        log("result", result)
    }
}
