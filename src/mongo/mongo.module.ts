import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoController } from './mongo.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_CONNECTION_STRING ??
        'mongodb+srv://toanthang1999hp_db_user:Z2elQmIG1s2g2nkf@cluster0.uflz1jv.mongodb.net/',
    ),
  ],
  controllers: [MongoController],
})
export class MongoModule {}
