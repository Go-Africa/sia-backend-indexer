import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as https from 'https'
import { BlocksRepository } from '../../repositories/block.repository';
import { TransactionsRepository } from 'src/features/transactions/repositories/transaction.recovery';
import { log } from 'console';

// import * as nacl from 'tweetnacl';
// import * as util from 'tweetnacl-util';


@Injectable()
export class BlockService {

    constructor(
        private readonly blockRepository: BlocksRepository,
    ) { }

    baseUrl = process.env.RENTERD_BASE_URL;
    httpAgent = new https.Agent({ rejectUnauthorized: false });
    private readonly logger = new Logger(BlockService.name);

    async getBlocks(page?: number, limit?: number) {
        if (page < 1) {
            throw new HttpException("la page dois etre supérieur à 0.", HttpStatus.BAD_REQUEST);
        }
        try {
            // Exécutez la requête avec pagination et tri
            const blocks = await this.blockRepository
                .findPaginate({}, page, limit)
            return blocks;
        } catch (error) {
            // Gérez les erreurs, par exemple, en enregistrant ou en lançant une nouvelle exception
            console.error('Erreur lors de la récupération des blocs :', error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async getOneBlock(height: string) {
        // get block from database
        const blockOfBD = await this.blockRepository.findOne({
            height: height
        }).catch((e: NotFoundException) => {
            // log(e.message);
        })

        // log("block get", blockOfBD)
        // check if already exists 
        if (!blockOfBD) {
            throw new HttpException("This block doen't exist", HttpStatus.NOT_FOUND);
        } else {
            this.logger.log("block " + height + " already added");
            return blockOfBD;
        }

    }
}
