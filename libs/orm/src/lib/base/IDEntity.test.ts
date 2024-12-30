import { IDEntity } from './IDEntity';

describe('IDEntity', () => {
    it('should create an instance of IDEntity', () => {
        const entity = new IDEntity();
        expect(entity).toBeInstanceOf(IDEntity);
    });

    it('should have an id property', () => {
        const entity = new IDEntity();
        expect(entity).toHaveProperty('id');
    });

    it('id property should be a number', () => {
        const entity = new IDEntity();
        expect(typeof entity.id).toBe('number');
    });

    it('id property should be auto-generated', () => {
        const entity1 = new IDEntity();
        const entity2 = new IDEntity();
        expect(entity1.id).not.toBe(entity2.id);
    });
});