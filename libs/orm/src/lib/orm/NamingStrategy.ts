import { NamingStrategyInterface, DefaultNamingStrategy } from 'typeorm';

export class DatabaseNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  override joinColumnName(propertyName: string): string {
    return propertyName;
  }

  override joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string
  ): string {
    return `${firstTableName}_${firstPropertyName}`;
  }
}
