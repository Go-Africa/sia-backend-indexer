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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const https = require("https");
const rxjs_1 = require("rxjs");
const shared_service_1 = require("../../../../shared/services/shared.service");
const latest_data_dto_1 = require("../../dtos/latest-data.dto");
const host_repositort_1 = require("../../../hosts/repositories/host.repositort");
const transaction_recovery_1 = require("../../../transactions/repositories/transaction.recovery");
const latest_data_repository_1 = require("../../repositories/latest-data.repository");
const schedule_1 = require("@nestjs/schedule");
let DashboardService = class DashboardService {
    constructor(httpService, hostRepository, transactionRepository, latestRepository) {
        this.httpService = httpService;
        this.hostRepository = hostRepository;
        this.transactionRepository = transactionRepository;
        this.latestRepository = latestRepository;
        this.logger = new common_1.Logger(shared_service_1.SharedService.name);
        this.httpAgent = new https.Agent({ rejectUnauthorized: false });
        this.coinmarketcapURL = process.env.BASE_CMC_URL;
        this.username = process.env.RENTERD_USER;
        this.password = process.env.RENTERD_PASSWORD;
        this.renterdURL = process.env.RENTERD_URL;
        this.base64Credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');
        this.total_storage = 0;
        this.remaining_storage = 0;
        this.used_storage = 0;
    }
    async getLatestData() {
        try {
            const latestData = await this.latestRepository
                .find({}, 1);
            return latestData[0];
        }
        catch (error) {
            console.error('Erreur:', error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getCMCData() {
        const url = `${this.coinmarketcapURL}/cryptocurrency/quotes/latest`;
        const headers = { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API };
        const queryParams = {
            slug: "siacoin",
        };
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                headers,
                params: queryParams,
                httpsAgent: this.httpAgent,
            }).pipe((0, rxjs_1.map)(resp => resp.data)));
            const hosts = await this.hostRepository.find({});
            for (let index = 0; index < hosts.length; index++) {
                const host = hosts[index];
                this.total_storage += host.settings.totalstorage;
                this.remaining_storage += host.settings.remainingstorage;
            }
            this.used_storage = this.total_storage - this.remaining_storage;
            this.logger.verbose("init count");
            const total_transaction = await this.transactionRepository.countTotalDoc({});
            this.logger.verbose("end count");
            const sia = response.data["1042"];
            const latestData = new latest_data_dto_1.LatestDataDTO();
            latestData.total_transaction = total_transaction;
            latestData.remaining_storage = this.remaining_storage;
            latestData.total_storage = this.total_storage;
            latestData.used_storage = this.used_storage;
            latestData.circulating_supply = sia.circulating_supply;
            latestData.totat_supply = sia.totat_supply;
            latestData.price = sia.quote.USD.price;
            latestData.volume_24h = sia.quote.USD.volume_24h;
            latestData.volume_change_24h = sia.quote.USD.volume_change_24h;
            latestData.percent_change_1h = sia.quote.USD.percent_change_1h;
            latestData.percent_change_24h = sia.quote.USD.percent_change_24h;
            latestData.percent_change_7d = sia.quote.USD.percent_change_7d;
            latestData.percent_change_30d = sia.quote.USD.percent_change_30d;
            latestData.percent_change_60d = sia.quote.USD.percent_change_60d;
            latestData.percent_change_90d = sia.quote.USD.percent_change_90d;
            latestData.market_cap_dominance = sia.quote.USD.market_cap_dominance;
            latestData.fully_diluted_market_cap = sia.quote.USD.fully_diluted_market_cap;
            latestData.market_cap = sia.quote.USD.market_cap;
            await this.latestRepository.create(latestData);
            this.logger.verbose("latest data created");
            return latestData;
        }
        catch (error) {
            (0, console_1.log)(error);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardService.prototype, "getCMCData", null);
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        host_repositort_1.HostRepository,
        transaction_recovery_1.TransactionsRepository,
        latest_data_repository_1.LatestDataRepository])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map