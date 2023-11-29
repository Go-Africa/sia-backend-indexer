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
var HostService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const https = require("https");
const rxjs_1 = require("rxjs");
const host_repositort_1 = require("../../repositories/host.repositort");
const schedule_1 = require("@nestjs/schedule");
let HostService = HostService_1 = class HostService {
    constructor(httpService, hostRepository) {
        this.httpService = httpService;
        this.hostRepository = hostRepository;
        this.logger = new common_1.Logger(HostService_1.name);
        this.httpAgent = new https.Agent({ rejectUnauthorized: false });
        this.username = process.env.RENTERD_USER;
        this.password = process.env.RENTERD_PASSWORD;
        this.renterdURL = process.env.RENTERD_URL;
        this.base64Credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    }
    async getHostFromSiad() {
        const url = `${this.renterdURL}/api/bus/hosts`;
        const headers = { 'Authorization': `Basic ${this.base64Credentials}` };
        const queryParams = {
            offset: 0,
            limit: -1,
        };
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                headers,
                params: queryParams,
                httpsAgent: this.httpAgent,
            }).pipe((0, rxjs_1.map)(resp => resp.data)));
            response.map(resp => {
                const host = resp;
                if (host.scanned) {
                    this.hostRepository.create(host).catch(err => this.logger.error(err.message));
                }
                (0, console_1.log)('not scanned');
            });
            return response;
        }
        catch (error) {
            (0, console_1.log)(error);
        }
    }
    async getHosts(page, limit) {
        if (page < 1) {
            throw new common_1.HttpException("la page dois etre supérieur à 0.", common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const blocks = await this.hostRepository
                .paginate({}, page, limit);
            return blocks;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des hosts :', error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getOneHost(publicKey) {
        const hostOfBD = await this.hostRepository.findOne({
            publicKey: publicKey
        }).catch((e) => {
        });
        if (!hostOfBD) {
            throw new common_1.HttpException("This host doen't exist", common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return hostOfBD;
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HostService.prototype, "getHostFromSiad", null);
HostService = HostService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        host_repositort_1.HostRepository])
], HostService);
exports.HostService = HostService;
//# sourceMappingURL=host.service.js.map