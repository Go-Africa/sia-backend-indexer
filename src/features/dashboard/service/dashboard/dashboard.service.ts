import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { log } from 'console';
import * as https from 'https'
import { lastValueFrom, map } from 'rxjs';
import { SharedService } from 'src/shared/services/shared.service';
import { LatestDataDTO } from '../../dtos/latest-data.dto';

@Injectable()
export class DashboardService {

    constructor(
        private httpService: HttpService,
    ) { }

    private readonly logger = new Logger(SharedService.name);
    httpAgent = new https.Agent({ rejectUnauthorized: false });

    coinmarketcapURL = process.env.BASE_CMC_URL;

    username = process.env.RENTERD_USER;
    password = process.env.RENTERD_PASSWORD;
    renterdURL = process.env.RENTERD_URL;
    base64Credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');

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
            log(response.data["1024"])
            const sia = response.data.filter(resp => resp.name == 'Siacoin')[0];
            const latestData = new LatestDataDTO();
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
            this.logger.log(sia);
            return sia
        } catch (error) {
            log(error)
        }
    }


    async getHost(){
        const url = `${this.renterdURL}/api/bus/hosts`;
        const headers = { 'Authorization': `Basic ${this.base64Credentials}` };
        const queryParams = {
            offset: 8000,
            limit: 10,
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
            log(response)
            return response
        } catch (error) {
            log(error)
        }
    }

}
