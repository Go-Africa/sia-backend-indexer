export declare class SiacoinInputDTO {
    parentid: string;
    unlockconditions: Unlockcondition;
}
declare class Unlockcondition {
    timelock: number;
    publickeys: Publickey[];
    signaturesrequired: number;
}
declare class Publickey {
    algorithm: string;
    key: string;
}
export {};
