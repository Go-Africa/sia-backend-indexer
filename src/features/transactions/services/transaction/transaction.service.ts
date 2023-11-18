import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { log } from 'console';
import { TransactionsRepository } from '../../repositories/transaction.recovery';

@Injectable()
export class TransactionService {

    constructor(
        private httpService: HttpService,
        private readonly transactionRepository: TransactionsRepository,
    ) { }
    baseUrl = process.env.RENTERD_BASE_URL;

    async getTransactions(offset: number = 0, page: number = 0, limit: number = 10) {
        try {
            // Exécutez la requête avec pagination et tri
            const transactions = await this.transactionRepository
                .findPaginate({}, offset, page, limit)
            log("result", transactions)
            return transactions;
        } catch (error) {
            // Gérez les erreurs, par exemple, en enregistrant ou en lançant une nouvelle exception
            console.error('Erreur lors de la récupération des transactions :', error);
            throw new Error('Erreur lors de la récupération des transactions.');
        }
    }

    async getOneTransaction(id: string) {
        // get transaction from database
        const transactionOfBD = await this.transactionRepository.findOne({
            id: id
        }).catch((e: NotFoundException) => {
            log(e.message);
        })

        // log("transaction get", transactionOfBD)
        // check if already exists 
        if (!transactionOfBD) {
            throw new HttpException("This transaction doen't exist", HttpStatus.NOT_FOUND);
        } else {
            return transactionOfBD;
        }

    }
}
