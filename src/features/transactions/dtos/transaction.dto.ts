import { SiacoinOutputDTO } from "./siacoinoutput.dto";

export class TransactionDTO {
    id: string;
    siacoininputs: SiacoinInputDTO[];
    siacoinoutputs: SiacoinOutputDTO[];
    filecontracts: string;
    filecontractrevisions: string;
    storageproofs: string;
    siafundinputs: string;
    siafundoutputs: string;
    minerfees: string[];
    arbitrarydata: string[];
    // transactionsignatures: TransactionSignatureDTO[];
}

class SiacoinInputDTO {
    parentid: string;
    unlockconditions: Unlockcondition;
}
class Unlockcondition {
    timelock: number;
    publickeys: Publickey[];
    signaturesrequired: number;
}
class Publickey {
    algorithm: string;
    key: string;
}