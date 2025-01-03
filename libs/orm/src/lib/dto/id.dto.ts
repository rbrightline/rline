import { Data, Property } from '@rline/property';

/**
 * Data Transfer Object (DTO) for representing an ID.
 *
 * This class is decorated with `@Data` to indicate that it is a data structure.
 * The `id` property is decorated with `@Property` to specify its type and validation constraints.
 *
 * @property {number} id - The unique identifier. It is an integer with a minimum value of 1 and is required.
 */
@Data()
export class IDDto {
  @Property({ type: 'integer', minimum: 1, required: true }) id?: number = 1;
}
