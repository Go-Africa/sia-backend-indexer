import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
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
    @Get('/get-all-host')
    async getAllHost() {
        const response = await this._dashService.getHosts();
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
