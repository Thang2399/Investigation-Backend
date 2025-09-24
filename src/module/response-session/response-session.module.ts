import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from '../../schema/survey.schema';
import { User, UserSchema } from '../../schema/user.schema';
import {
  ResponseSession,
  ResponseSessionSchema,
} from '../../schema/response-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Survey.name,
        schema: SurveySchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ResponseSession.name,
        schema: ResponseSessionSchema,
      },
    ]),
  ],
})
export class ResponseSessionModule {}
