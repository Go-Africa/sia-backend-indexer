import { TransactionDTO } from "src/features/transactions/dtos/transaction.dto";
import { MinerPayoutDTO } from "./miner-payout.dto";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class BlockResponseDTO {
    @ApiProperty()
    _id: Types.ObjectId;
    @ApiProperty()
    id: string;
    @ApiProperty()
    height: number;
    @ApiProperty()
    parentid: string;
    @ApiProperty()
    nonce: number[];
    @ApiProperty()
    difficulty: string;
    @ApiProperty()
    timestamp: number;
    @ApiProperty()
    minerpayouts: MinerPayoutDTO; // Vous pouvez également créer un DTO spécifique pour MinerPayout si nécessaire
    @ApiProperty()
    transactionId: string[];; // Vous pouvez également créer un DTO spécifique pour Transaction si nécessaire
    
}