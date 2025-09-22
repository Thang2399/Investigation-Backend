import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Question API')
@Controller('question')
export class QuestionController {
  constructor() {}
}
