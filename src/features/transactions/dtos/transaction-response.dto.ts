import { ApiProperty } from "@nestjs/swagger";
import { SiacoinInputDTO } from "./siacoininput.dto";
import { SiacoinOutputDTO } from "./siacoinoutput.dto";

export class TransactionResponseDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    siacoininputs: SiacoinInputDTO[];
    @ApiProperty()
    siacoinoutputs: SiacoinOutputDTO[];
    @ApiProperty()
    filecontracts: string;
    @ApiProperty()
    filecontractrevisions: string;
    @ApiProperty()
    storageproofs: string;
    @ApiProperty()
    height: number;
    @ApiProperty()
    siafundinputs: string;
    @ApiProperty()
    siafundoutputs: string;
    @ApiProperty()
    minerfees: string[];
    @ApiProperty()
    arbitrarydata: string[];
    @ApiProperty()
    timestamp: number;
    // transactionsignatures: TransactionSignatureDTO[];
}

