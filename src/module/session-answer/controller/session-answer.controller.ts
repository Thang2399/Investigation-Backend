import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { SessionAnswerService } from '../service/session-answer.service';
import { CreateSessionAnswerDto } from '../dto/create-session-answer.dto';
import { Response } from 'express';

@ApiTags('Session Answer API')
@Controller('session-answer')
export class SessionAnswerController {
  constructor(private readonly sessionAnswerService: SessionAnswerService) {}

  @ApiOperation({ description: 'Create Session Answer' })
  @ApiBody({ type: CreateSessionAnswerDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSessionAnswer(
    @Body() dto: CreateSessionAnswerDto,
    @Res() res: Response,
  ) {
    return this.sessionAnswerService.createSessionAnswer(dto, res);
  }
}
