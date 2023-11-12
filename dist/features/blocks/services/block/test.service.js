"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyService = void 0;
const nestjs_websocket_1 = require("nestjs-websocket");
const common_1 = require("@nestjs/common");
let MyService = class MyService {
    constructor(ws) {
        this.ws = ws;
        this.data = {};
    }
    onOpen() {
        this.ws.send();
    }
    message(data) {
        this.data = JSON.parse(data.toString());
    }
    async getData() {
        return this.data;
    }
};
__decorate([
    (0, nestjs_websocket_1.OnOpen)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyService.prototype, "onOpen", null);
__decorate([
    (0, nestjs_websocket_1.OnMessage)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof nestjs_websocket_1.WebSocketClient !== "undefined" && nestjs_websocket_1.WebSocketClient.Data) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], MyService.prototype, "message", null);
MyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_websocket_1.WebSocketClient !== "undefined" && nestjs_websocket_1.WebSocketClient) === "function" ? _a : Object])
], MyService);
exports.MyService = MyService;
//# sourceMappingURL=test.service.js.map