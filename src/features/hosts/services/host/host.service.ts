import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { log } from 'console';
import * as https from 'https'
import { lastValueFrom, map } from 'rxjs';
import { Host } from '../../schemas/host.schema';
import { HostRepository } from '../../repositories/host.repositort';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class HostService {

    constructor(
        private httpService: HttpService,
        private readonly hostRepository: HostRepository,
    ) { 
        this.getHostFromSiad();
    }

    private readonly logger = new Logger(HostService.name);
    httpAgent = new https.Agent({ rejectUnauthorized: false });

    username = process.env.RENTERD_USER;
    password = process.env.RENTERD_PASSWORD;
    renterdURL = process.env.RENTERD_URL;
    base64Credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');

    @Cron(CronExpression.EVERY_12_HOURS)
    async getHostFromSiad(){
        const url = `${this.renterdURL}/api/bus/hosts`;
        const headers = { 'Authorization': `Basic ${this.base64Credentials}` };
        const queryParams = {
            offset: 0,
            limit: -1,
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
            response.map(resp => {
                const host: Host = resp;
                if (host.scanned) {
                    this.hostRepository.create(host).catch(err => this.logger.error(err.message));
                }
                log('not scanned')
            })
            return response
        } catch (error) {
            log(error)
        }
    }

    async getHosts(page?: number, limit?: number) {
        if (page < 1) {
            throw new HttpException("la page dois etre supérieur à 0.", HttpStatus.BAD_REQUEST);
        }
        try {
            // Exécutez la requête avec pagination et tri
            const blocks = await this.hostRepository
                .paginate({}, page, limit)
            // log("result", blocks)
            return blocks;
        } catch (error) {
            // Gérez les erreurs, par exemple, en enregistrant ou en lançant une nouvelle exception
            console.error('Erreur lors de la récupération des hosts :', error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async getOneHost(publicKey: string) {
        // get block from database
        const hostOfBD = await this.hostRepository.findOne({
            publicKey: publicKey
        }).catch((e: NotFoundException) => {
            // log(e.message);
        })

        // log("block get", hostOfBD)
        // check if already exists 
        if (!hostOfBD) {
            throw new HttpException("This host doen't exist", HttpStatus.NOT_FOUND);
        } else {
            return hostOfBD;
        }

    }

}
