import Vue from 'vue';
import Tabs from './tabs.vue';
import {mountComponent} from 'test/helpers.js';

const test = {
  id: 'test'
};

describe('Tabs', () => {
  it('should initialize correctly', () => {
    const comp = mountComponent(Tabs, test);
    expect(comp.id).toBe('test');
    expect(comp.tabs).toEqual([]);
    expect(comp.selected).toEqual([]);
  });

  it('should update selected', () => {
    const comp = mountComponent(Tabs, {...test, tabs: ['one', 'two']});
    expect(comp.selected).toEqual([true, false]);
    comp.select(0);
    expect(comp.selected).toEqual([true, false]);
    comp.select(1);
    expect(comp.selected).toEqual([false, true]);
  });
});
