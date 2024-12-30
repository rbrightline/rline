import { QueryStringBuilder } from './query-string-builder';
import { QueryItem } from './query-item';

describe('QueryStringBuilder', () => {
  describe('add', () => {
    it('should add a query item to the collection', () => {
      const builder = new QueryStringBuilder();
      const item: QueryItem = { key: 'name', operator: 'eq', value: 'John' };

      builder.add(item);

      expect(builder['items']).toContain(item);
    });

    it('should return the current instance of QueryStringBuilder', () => {
      const builder = new QueryStringBuilder();
      const item: QueryItem = { key: 'name', operator: 'eq', value: 'John' };

      const result = builder.add(item);

      expect(result).toBe(builder);
    });
  });
});
