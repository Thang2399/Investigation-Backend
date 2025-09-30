import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Res,
  Post,
} from '@nestjs/common';
import { AnswerService } from '../service/answer.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Response } from 'express';

@ApiTags('Answer API')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOperation({ description: 'Create answer to answer question.' })
  @ApiBody({ type: CreateAnswerDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNewAnswer(@Body() dto: CreateAnswerDto, @Res() res: Response) {
    return this.answerService.createNewAnswer(dto, res);
  }
}
