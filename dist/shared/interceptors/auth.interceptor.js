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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInterceptor = void 0;
const common_1 = require("@nestjs/common");
const console_1 = require("console");
let AuthInterceptor = class AuthInterceptor {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const base64Credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');
        request.headers['Authorization'] = `Basic ${base64Credentials}`;
        request.headers['User-Agent'] = 'Sia-Agent';
        (0, console_1.log)("headers requests", request.headers);
        return next.handle();
    }
};
AuthInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERNAME')),
    __param(1, (0, common_1.Inject)('PASSWORD')),
    __metadata("design:paramtypes", [String, String])
], AuthInterceptor);
exports.AuthInterceptor = AuthInterceptor;
//# sourceMappingURL=auth.interceptor.js.map