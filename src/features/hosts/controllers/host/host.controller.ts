import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HostService } from '../../services/host/host.service';
import { Host } from '../../schemas/host.schema';

@ApiTags('host')
@Controller('host')
export class HostController {

    constructor(
        private _dashService: HostService
    ) { }

    @ApiResponse({ status: 200, description: 'Successfully get all host'})
    @ApiResponse({ status: 400, description: 'Bad request', type: [Host] })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @Get('/get-all-host')
    async getAllHost(
        @Query('page') page?: number,
        @Query('limit') limit?: number,) {
        const response = await this._dashService.getHosts(page, limit);
        return response;
    }

    @ApiResponse({ status: 200, description: 'Successfully get one host'})
    @ApiResponse({ status: 400, description: 'Bad request', type: Host })
    @Get('/get-one-host/:publicKey')
    async getOneHost(@Param("publicKey") publicKey: string) {
        const response = await this._dashService.getOneHost(publicKey);
        return response;
    }
}
