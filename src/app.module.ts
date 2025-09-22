import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MongoModule } from './mongo/mongo.module';
import { ApiConfigModule } from './config/api/app-config.module';

const modules = [
  ApiConfigModule,
  HealthModule,
  MongoModule
]

@Module({
  imports: modules,
  controllers: [],
  providers: [],
})
export class AppModule {}
