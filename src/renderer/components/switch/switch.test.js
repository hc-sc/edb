import Vue from 'vue';
import Switch from './switch.vue';
import {mountComponent} from 'test/helpers.js';

const test = {
  id: 'test',
  label: 'Test'
};

describe('Switch', () => {
  it('should initialize correctly', () => {
    const comp = mountComponent(Switch, test);
    expect(comp.id).toBe('test');
    expect(comp.label).toBe('Test');
    expect(comp.show).toBe(false);
    expect(comp.onValue).toBe('on');
    expect(comp.offValue).toBe('off');
    expect(comp.value).toBe(false);
    expect(comp.displayValue).toBe('off');
  });

  it('should be able to display different on/off', () => {
    const comp = mountComponent(Switch, {...test, onValue: 'yup', offValue: 'nope'});
    expect(comp.displayValue).toBe('nope');
    comp.value = true;
    expect(comp.displayValue).toBe('yup');
  });
});
