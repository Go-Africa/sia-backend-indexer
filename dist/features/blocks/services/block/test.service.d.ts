import { WebSocketClient } from 'nestjs-websocket';
export declare class MyService {
    private readonly ws;
    private data;
    constructor(ws: WebSocketClient);
    onOpen(): void;
    message(data: WebSocketClient.Data): void;
    getData(): Promise<Record<any, any>>;
}
