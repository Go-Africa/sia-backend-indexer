import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionResponseDTO } from '../../dtos/transaction-response.dto';

@ApiTags('Transaction')
@Controller('Transaction')
export class TransactionController {
    constructor(
        private _transactionService: TransactionService
    ) { }

    @ApiResponse({ status: 200, description: 'Successfully get all activitys', type: TransactionResponseDTO})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @Get('/get-all-transactions')
    async getAllTransaction(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        const response = await this._transactionService.getTransactions(page, limit);
        return response;
    }

    @ApiResponse({ status: 200, description: 'Successfully get all activitys', type: TransactionResponseDTO})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get('/get-one-transaction/:hash')
    async getOneTransaction(@Param("hash") hash: string){
        const response = await this._transactionService.getOneTransaction(hash);
        return response;
    }
}
