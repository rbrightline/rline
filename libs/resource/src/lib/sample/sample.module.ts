import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from '@rline/entity';
import { provideEntityService } from '@rline/orm';
import { SampleController } from './sample.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  providers: [provideEntityService(Sample)],
  controllers: [SampleController],
})
export class SampleModule {}
