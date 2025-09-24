import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestionService } from '../service/question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Response } from 'express';
import { DeleteQuestionsDto } from '../dto/delete-questions.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';

@ApiTags('Question API')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ description: 'Get detail of a question' })
  @ApiParam({ name: 'id', description: 'Question ID', type: String })
  @Get('/:id')
  async getDetailQuestion(@Param('id') id: string) {
    return this.questionService.getDetailQuestion(id);
  }

  @ApiOperation({ description: 'Create new question' })
  @ApiBody({ type: CreateQuestionDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(@Body() dto: CreateQuestionDto, @Res() res: Response) {
    return this.questionService.createQuestion(dto, res);
  }

  @ApiOperation({ description: 'Update question' })
  @ApiParam({ name: 'id', description: 'Question ID', type: String })
  @ApiBody({ type: UpdateQuestionDto })
  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() dto: UpdateQuestionDto,
  ) {
    return this.questionService.updateQuestion(id, dto, res);
  }

  @ApiOperation({ description: 'Delete questions' })
  @ApiBody({ type: DeleteQuestionsDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deleteQuestion(@Body() dto: DeleteQuestionsDto) {
    return this.questionService.deleteQuestions(dto);
  }
}
