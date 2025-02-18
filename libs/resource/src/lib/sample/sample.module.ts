import { Logger, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from '@rline/entity';
import { provideEntityService } from '@rline/orm';
import { SampleController } from './sample.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  providers: [
    provideEntityService(Sample),
    {
      provide: Logger,
      useValue: new Logger(Sample.name),
    },
  ],
  controllers: [SampleController],
})
export class SampleModule {}
