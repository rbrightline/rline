import { Logger } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
  protected readonly logger: Logger;
  constructor(protected readonly repo: Repository<T>) {
    this.logger = new Logger(this.constructor.name);
  }
}
