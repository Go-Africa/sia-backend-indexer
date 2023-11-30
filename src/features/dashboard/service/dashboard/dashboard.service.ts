import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { log } from 'console';
import * as https from 'https'
import { lastValueFrom, map } from 'rxjs';
import { SharedService } from 'src/shared/services/shared.service';
import { LatestDataDTO } from '../../dtos/latest-data.dto';
import { HostRepository } from 'src/features/hosts/repositories/host.repositort';
import { TransactionsRepository } from 'src/features/transactions/repositories/transaction.recovery';
import { LatestDataRepository } from '../../repositories/latest-data.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DashboardService {

    constructor(
        private httpService: HttpService,
        private readonly hostRepository: HostRepository,
        private readonly transactionRepository: TransactionsRepository,
        private readonly latestRepository: LatestDataRepository,
    ) { 
        this.getCMCData();
    }

    private readonly logger = new Logger(SharedService.name);
    httpAgent = new https.Agent({ rejectUnauthorized: false });

    coinmarketcapURL = process.env.BASE_CMC_URL;

    username = process.env.RENTERD_USER;
    password = process.env.RENTERD_PASSWORD;
    renterdURL = process.env.RENTERD_URL;
    base64Credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');

    total_storage: number = 0;
    remaining_storage: number = 0;
    used_storage: number = 0;

    async getLatestData(){
        try {
            // Exécutez la requête avec pagination et tri
            const latestData = await this.latestRepository
                .find({}, 1)
            return latestData[0];
        } catch (error) {
            // Gérez les erreurs, par exemple, en enregistrant ou en lançant une nouvelle exception
            console.error('Erreur:', error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Cron(CronExpression.EVERY_12_HOURS)
    async getCMCData(){
        const url = `${this.coinmarketcapURL}/cryptocurrency/quotes/latest`;
        const headers = { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API };
        const queryParams = {
            slug: "siacoin",
          };
        try {
            const response = await lastValueFrom(
                this.httpService.get(url, {
                    headers,
                    params: queryParams,
                    httpsAgent: this.httpAgent,
                }).pipe(
                    map(resp => resp.data),
                ),
            );
            const hosts = await this.hostRepository.find({});
            for (let index = 0; index < hosts.length; index++) {
                const host = hosts[index];
                this.total_storage += host.settings.totalstorage;
                this.remaining_storage += host.settings.remainingstorage;
            }
            this.used_storage = this.total_storage - this.remaining_storage;
            this.logger.verbose("init count");
            const total_transaction = await this.transactionRepository.countTotalDoc({})
            this.logger.verbose("end count");
            const sia = response.data["1042"]
            const latestData = new LatestDataDTO();
            latestData.total_transaction = total_transaction;
            latestData.total_hosts = hosts.length;
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
            return latestData   
        } catch (error) {
            log(error)
        }
    }

}
