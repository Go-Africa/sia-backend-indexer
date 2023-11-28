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
exports.HostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const host_service_1 = require("../../services/host/host.service");
const host_schema_1 = require("../../schemas/host.schema");
let HostController = class HostController {
    constructor(_dashService) {
        this._dashService = _dashService;
    }
    async getAllHost() {
        const response = await this._dashService.getHosts();
        return response;
    }
    async getOneHost(publicKey) {
        const response = await this._dashService.getOneHost(publicKey);
        return response;
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully get all host' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request', type: [host_schema_1.Host] }),
    (0, common_1.Get)('/get-all-host'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HostController.prototype, "getAllHost", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully get one host' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request', type: host_schema_1.Host }),
    (0, common_1.Get)('/get-one-host/:publicKey'),
    __param(0, (0, common_1.Param)("publicKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "getOneHost", null);
HostController = __decorate([
    (0, swagger_1.ApiTags)('host'),
    (0, common_1.Controller)('host'),
    __metadata("design:paramtypes", [host_service_1.HostService])
], HostController);
exports.HostController = HostController;
//# sourceMappingURL=host.controller.js.map