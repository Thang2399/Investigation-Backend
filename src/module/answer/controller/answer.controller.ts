import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Res,
  Post,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { AnswerService } from '../service/answer.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Response } from 'express';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { GetListAnswersDto } from '../dto/get-list-answers.dto';

@ApiTags('Answer API')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOperation({ description: 'Get list answers' })
  @Get()
  async getListAnswers(@Query() query: GetListAnswersDto, @Res() res: Response) {
    return this.answerService.getListAnswers(query, res);
  }

  @ApiOperation({ description: 'Get detail answer' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getDetailAnswer(@Param('id') id: string, @Res() response: Response) {
    return this.answerService.getDetailAnswer(id, response);
  }

  @ApiOperation({ description: 'Create answer to answer question.' })
  @ApiBody({ type: CreateAnswerDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNewAnswer(@Body() dto: CreateAnswerDto, @Res() res: Response) {
    return this.answerService.createNewAnswer(dto, res);
  }

  @ApiOperation({ description: 'Update answer to answer question.' })
  @ApiBody({ type: UpdateAnswerDto })
  @ApiParam({ name: 'id', type: 'string' })
  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateAnswer(
    @Param('id') id: string,
    @Body() dto: UpdateAnswerDto,
    @Res() response: Response,
  ) {
    return this.answerService.updateAnswer(id, dto, response);
  }
}
