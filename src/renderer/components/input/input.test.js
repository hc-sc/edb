import Vue from 'vue';
import Input from './input.vue';
import {mountComponent} from 'test/helpers.js';

const test = {
  id: 'test',
  label: 'Test'
};

describe('Input', () => {
  it('should be initialize correctly', () => {
    const comp = mountComponent(Input, test);
    expect(comp._isMounted).toBe(true);
    expect(comp.id).toBe('test');
    expect(comp.compName).toEqual(comp.id);
    expect(comp.label).toBe('Test');
    expect(comp.type).toBe('text');
    expect(comp.required).toBe(false);
    expect(comp.disabled).toBe(false);
    expect(comp.min).toBeUndefined();
    expect(comp.max).toBeUndefined();
    expect(comp.pattern).toBeUndefined();
    expect(comp.message).toBeUndefined();
    expect(comp.touched).toBe(false);
    expect(comp.showErrors).toBe(true);
  });

  it('should have name be id if not provided', () => {
    const comp = mountComponent(Input, {...test, name: 'name'});
    expect(comp.id).toBe('test');
    expect(comp.compName).toBe('name');
  });

  it('should correctly determine text fields', () => {
    const comp = mountComponent(Input, test);
    expect(comp.type).toBe('text');
    expect(comp.isTextField).toBe(true);
    comp.type = 'email';
    expect(comp.isTextField).toBe(true);
    comp.type = 'date';
    expect(comp.isTextField).toBe(false);
  });

  it('should be empty when text field and length is 0', () => {
    const comp = mountComponent(Input, test);
    expect(comp.empty).toBe(true);
    comp.value = 'hello';
    expect(comp.empty).toBe(false);
  });

  describe('validPattern', () => {
    it('should return true if text field and no pattern', () => {
      const comp = mountComponent(Input, test);
      expect(comp.validPattern).toBe(true);
    });

    it('should match patterns when text field and pattern', () => {
      const comp = mountComponent(Input, {...test, pattern: /^hell.$/});
      expect(comp.validPattern).toBe(false);
      comp.value = 'hellothere';
      expect(comp.validPattern).toBe(false);
      comp.value = 'hello';
      expect(comp.validPattern).toBe(true);
    });
  });

  describe('validBounds', () => {
    it('should be able to have any length when text field and no max', () => {
      const comp = mountComponent(Input, test);
      expect(comp.validBounds).toBe(true);
      comp.value = 'm'.repeat(1000);
      expect(comp.validBounds).toBe(true);
    });

    it('should be able to be any number when number field and no min or max', () => {
      const comp = mountComponent(Input, {...test, type: 'number'});
      expect(comp.validBounds).toBe(true);
      comp.value = Number.MIN_SAFE_INTEGER;
      expect(comp.validBounds).toBe(true);
      comp.value = Number.MAX_SAFE_INTEGER;
      expect(comp.validBounds).toBe(true);
    });

    it('should fail when text field and length greater than max', () => {
      const comp = mountComponent(Input, {...test, type: 'text', max: 2});
      expect(comp.validBounds).toBe(true);
      comp.value = 'fail';
      expect(comp.validBounds).toBe(false);
    });

    it('should fail when number field and value less than min or greater than max', () => {
      const comp = mountComponent(Input, {...test, type: 'number', min: -5, max: 5});
      expect(comp.validBounds).toBe(true);
      comp.value = -3;
      expect(comp.validBounds).toBe(true);
      comp.value = -5;
      expect(comp.validBounds).toBe(true);
      comp.value = -6;
      expect(comp.validBounds).toBe(false);
      comp.value = 3;
      expect(comp.validBounds).toBe(true);
      comp.value = 5;
      expect(comp.validBounds).toBe(true);
      comp.value = 6;
      expect(comp.validBounds).toBe(false);
    });

    it('should return true for anything else', () => {
      const comp = mountComponent(Input, {...test, type: 'date'});
      expect(comp.validBounds).toBe(true);
    });
  });

  describe('invalid', () => {
    it('should fail if touched and is not valid bounds, pattern, or required', () => {
      const comp = mountComponent(Input, {...test, max: 2, pattern: /he/, required: true});
      expect(comp.invalid).toBe(false);

      // not touched yet
      comp.value = 'h'; // invalid pattern
      expect(comp.invalid).toBe(false);
      comp.value = 'hel'; // too long
      expect(comp.invalid).toBe(false);
      comp.value = ''; // empty with required
      expect(comp.invalid).toBe(false);
      comp.value = 'he'; // valid
      expect(comp.invalid).toBe(false);

      comp.touched = true;

      comp.value = 'h'; // invalid pattern
      expect(comp.invalid).toBe(true);
      comp.value = 'hel'; // too long
      expect(comp.invalid).toBe(true);
      comp.value = ''; // empty with required
      expect(comp.invalid).toBe(true);
      comp.value = 'he'; // valid
      expect(comp.invalid).toBe(false);
    });
  });

  describe('isTextField', () => {
    it('should return the correct value depending on type', () => {
      const comp = mountComponent(Input, test);
      expect(comp.type).toBe('text');
      expect(comp.isTextField).toBe(true);
      comp.type = 'email';
      expect(comp.isTextField).toBe(true);
      comp.type = 'fail';
      expect(comp.isTextField).toBe(false);
    });
  });

  describe('updateValue', () => {
    it('should update value', () => {
      const comp = mountComponent(Input, test);
      expect(comp.value).toBe('');
      comp.updateValue('new');
      expect(comp.value).toBe('new');
    });
  });

  describe('toDate', () => {
    it('should fail with invalid date', () => {
      const comp = mountComponent(Input, test);
      expect(comp.toDate('fail')).toBeUndefined();
      expect(comp.toDate(-43247897894324324)).toBeUndefined();
      expect(comp.toDate('1995-01-01')).toBe('1995-01-01');
    });
  });

  describe('errorMessage', () => {
    it('should return the correct message if given, or the default', () => {
      const comp = mountComponent(Input, test);
      expect(comp.$options.filters.errorMessage()).toBe('Invalid pattern');
      expect(comp.$options.filters.errorMessage('message')).toBe('message');
    });
  });
});
