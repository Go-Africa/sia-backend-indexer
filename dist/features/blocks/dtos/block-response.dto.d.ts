import { MinerPayoutDTO } from "./miner-payout.dto";
import { Types } from "mongoose";
export declare class BlockResponseDTO {
    _id: Types.ObjectId;
    id: string;
    height: number;
    parentid: string;
    nonce: number[];
    difficulty: string;
    timestamp: number;
    minerpayouts: MinerPayoutDTO;
    transactionId: string[];
}
