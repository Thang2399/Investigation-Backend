import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ResponseSessionService } from '../service/response-session.service';
import { CreateResponseSessionDto } from '../dto/create-response-session.dto';
import { Response } from 'express';
import { UpdateStatusResponseSessionDTO } from '../dto/update-status-response-session.dto';

@ApiTags('Response session API')
@Controller('response-session')
export class ResponseSessionController {
  constructor(
    private readonly responseSessionService: ResponseSessionService,
  ) {}

  @ApiOperation({ description: 'Create response session' })
  @ApiBody({ type: CreateResponseSessionDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNewResponseSession(
    @Body() dto: CreateResponseSessionDto,
    @Res() res: Response,
  ) {
    return this.responseSessionService.createNewResponseSession(dto, res);
  }

  @ApiOperation({ description: 'Update response session status' })
  @ApiBody({ type: UpdateStatusResponseSessionDTO })
  @ApiParam({ name: 'id', description: 'Id of response session' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Put(':id')
  async updateResponseSessionStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusResponseSessionDTO,
    @Res() res: Response,
  ) {
    return this.responseSessionService.updateResponseSessionStatus(
      id,
      dto,
      res,
    );
  }

}
