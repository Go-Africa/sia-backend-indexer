import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { IBlockService } from '../../services/block/Iblock.service';
import { BlockService } from '../../services/block/block.service';
import { BlockGetDTO } from '../../dtos/block-get.dto';
import { BlockResponseDTO } from '../../dtos/block-response.dto';

@ApiTags('block')
@Controller('block')
export class BlockController {
    constructor(
        private _blockService: BlockService
    ) { }

    @ApiResponse({ status: 200, description: 'Successfully get all activitys', type: BlockResponseDTO})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'offset', required: false })
    @Get('/get-all-blocks')
    async getAllactivity(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('offset') offset?: number
    ) {
        const response = await this._blockService.getBlocks(offset, page, limit);
        return response;
    }

    @ApiResponse({ status: 200, description: 'Successfully get all activitys', type: BlockResponseDTO})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get('/get-one-block/:height')
    async getOneBlock(@Param("height") height: string){
        const response = await this._blockService.getOneBlock(height);
        return response;
    }
}
