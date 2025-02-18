import { DefaultNamingStrategy } from 'typeorm';

export class NamingStrategy extends DefaultNamingStrategy {
  override joinColumnName(
    relationName: string,
    _referencedColumnName: string
  ): string {
    return relationName;
  }
}
