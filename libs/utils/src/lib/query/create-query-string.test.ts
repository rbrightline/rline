import { createQueryString } from './create-query-string';
import { QueryItems } from './query-item';
import { QUERY_STRING_DELIMETER } from './query-string-delimeter';

describe('createQueryString', () => {
    it('should create a query string from an array of query items', () => {
        const queryItems: QueryItems = [
            { key: 'name', operator: 'eq', value: 'John' },
            { key: 'age', operator: 'gt', value: '30' }
        ];
        const expectedQueryString = `where=name${QUERY_STRING_DELIMETER}eq${QUERY_STRING_DELIMETER}John&where=age${QUERY_STRING_DELIMETER}gt${QUERY_STRING_DELIMETER}30`;

        const result = createQueryString(queryItems);

        expect(result).toBe(expectedQueryString);
    });

    it('should return an empty string if no query items are provided', () => {
        const queryItems: QueryItems = [];
        const expectedQueryString = '';

        const result = createQueryString(queryItems);

        expect(result).toBe(expectedQueryString);
    });

    it('should handle query items with special characters', () => {
        const queryItems: QueryItems = [
            { key: 'name', operator: 'eq', value: 'John Doe' },
            { key: 'age', operator: 'lt', value: '20&30' }
        ];
        const expectedQueryString = `where=name${QUERY_STRING_DELIMETER}eq${QUERY_STRING_DELIMETER}John Doe&where=age${QUERY_STRING_DELIMETER}lt${QUERY_STRING_DELIMETER}20&30`;

        const result = createQueryString(queryItems);

        expect(result).toBe(expectedQueryString);
    });
});