import { pluralize } from './pluralize';

describe('pluralize', () => {
    it('should return the correct plural for irregular plurals', () => {
        expect(pluralize('child')).toBe('children');
        expect(pluralize('person')).toBe('people');
        expect(pluralize('man')).toBe('men');
        expect(pluralize('woman')).toBe('women');
        expect(pluralize('mouse')).toBe('mice');
        expect(pluralize('tooth')).toBe('teeth');
        expect(pluralize('foot')).toBe('feet');
        expect(pluralize('goose')).toBe('geese');
        expect(pluralize('ox')).toBe('oxen');
        expect(pluralize('cactus')).toBe('cacti');
        expect(pluralize('focus')).toBe('foci');
        expect(pluralize('radius')).toBe('radii');
        expect(pluralize('syllabus')).toBe('syllabi');
    });

    it('should return the same word for uncountable words', () => {
        expect(pluralize('fish')).toBe('fish');
        expect(pluralize('sheep')).toBe('sheep');
        expect(pluralize('deer')).toBe('deer');
        expect(pluralize('moose')).toBe('moose');
        expect(pluralize('series')).toBe('series');
        expect(pluralize('species')).toBe('species');
        expect(pluralize('data')).toBe('data');
        expect(pluralize('equipment')).toBe('equipment');
        expect(pluralize('information')).toBe('information');
        expect(pluralize('rice')).toBe('rice');
        expect(pluralize('money')).toBe('money');
    });

    it('should return the correct plural for regular words ending with "y"', () => {
        expect(pluralize('city')).toBe('cities');
        expect(pluralize('baby')).toBe('babies');
    });

    it('should return the correct plural for regular words ending with "s", "x", "z", "sh", or "ch"', () => {
        expect(pluralize('bus')).toBe('buses');
        expect(pluralize('box')).toBe('boxes');
        expect(pluralize('buzz')).toBe('buzzes');
        expect(pluralize('brush')).toBe('brushes');
        expect(pluralize('church')).toBe('churches');
    });

    it('should return the correct plural for regular words ending with "f" or "fe"', () => {
        expect(pluralize('leaf')).toBe('leaves');
        expect(pluralize('knife')).toBe('knives');
    });

    it('should return the correct plural for regular words', () => {
        expect(pluralize('cat')).toBe('cats');
        expect(pluralize('dog')).toBe('dogs');
    });
});