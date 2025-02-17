import { Module } from '@nestjs/common';
import { provideEntityService } from '../../src';
import { SampleController } from './sample.controller';
import { Sample } from './sample.entity';

@Module({
  imports: [],
  providers: [provideEntityService(Sample)],
  controllers: [SampleController],
})
export class SampleModule {}
