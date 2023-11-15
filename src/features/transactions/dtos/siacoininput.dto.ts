export class SiacoinInputDTO {
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