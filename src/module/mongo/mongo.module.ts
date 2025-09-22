import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoController } from './mongo.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => {
        const uri = cs.get<string>('MONGODB_CONNECTION_STRING');
        if (!uri) {
          // fail early so you notice missing config
          throw new Error(
            'MONGODB_CONNECTION_STRING is not set. Check your .env or env config.',
          );
        }
        return {
          uri,
        };
      },
    }),
  ],
  controllers: [MongoController],
})
export class MongoModule {}
