import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
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
  Query,
  Res,
} from '@nestjs/common';
import { SurveyService } from '../service/survey.service';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { Response } from 'express';
import { DeleteSurveysDto } from '../dto/delete-surveys.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { GetListSurveysDto } from '../dto/get-list-surveys.dto';

@ApiTags('Survey API')
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @ApiOperation({ description: 'Get list surveys' })
  @Get()
  async getListSurveys(
    @Query() query: GetListSurveysDto,
    @Res() res: Response,
  ) {
    return this.surveyService.getListSurveys(query, res);
  }

  @ApiOperation({ description: 'Create survey' })
  @ApiBody({ type: CreateSurveyDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNewSurvey(@Body() dto: CreateSurveyDto, @Res() res: Response) {
    return this.surveyService.createNewSurvey(dto, res);
  }

  @ApiOperation({ description: 'Get detail survey' })
  @ApiParam({ name: 'id', description: 'Id of survey', type: String })
  @Get('/:id')
  async getDetailSurvey(@Param('id') id: string) {
    return this.surveyService.getDetailSurvey(id);
  }

  @ApiOperation({ description: 'Update survey' })
  @ApiBody({ type: UpdateSurveyDto })
  @ApiParam({ name: 'id', description: 'Id of survey', type: String })
  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateSurvey(
    @Param('id') id: string,
    @Body() dto: UpdateSurveyDto,
    @Res() res: Response,
  ) {
    return this.surveyService.updateSurvey(id, dto, res);
  }

  @ApiOperation({ description: 'Delete survey' })
  @ApiBody({ type: DeleteSurveysDto })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSurveys(@Body() dto: DeleteSurveysDto, @Res() res: Response) {
    return this.surveyService.deleteSurveys(dto, res);
  }
}
