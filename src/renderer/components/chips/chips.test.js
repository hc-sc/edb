import Vue from 'vue';
import Chips from './chips.vue';
import {mountComponent} from 'test/helpers.js';

const test1 = {
  id: 'test',
  label: 'Test',
};

const test2 = {
  ...test1,
  items: ['one', 'two', 'three']
};

describe('Chips', () => {
  it('should initialize with correct default values', () => {
    const comp = mountComponent(Chips, test1);
    expect(comp.id).toBe('test');
    expect(comp.label).toBe('Test');
    expect(comp.chips).toEqual([]);
    expect(comp.autocomplete).toBe('off');
    expect(comp.unique).toBe(true);
    expect(comp.deletable).toBe(true);
    expect(comp.editable).toBe(true);
    expect(comp.sortable).toBe(true);
    expect(comp.value).toBe('');
  });

  it('should initialize chips when there are items', () => {
    const comp = mountComponent(Chips, test2);
    expect(comp.chips).toEqual(['one', 'two', 'three']);
  });

  it('should be able to add new items, and should clear value', done => {
    const comp = mountComponent(Chips, test2);
    console.log('before', comp.items);
    comp.value = 'new';
    comp.addItem();
    comp.$nextTick(() => {
      console.log(comp.items);
      done();
    });
  });

  it('shoult not add when value is empty', () => {
    const comp = mountComponent(Chips, test2);
    comp.addItem();
    expect(comp.items).toEqual(['one', 'two', 'three']);
  });

  it('should be able to delete items', () => {
    const comp = mountComponent(Chips, test2);
    comp.deleteItem(1);
    expect(comp.items).toEqual(['one', 'three']);
    comp.deleteItem(1);
    expect(comp.items).toEqual(['one']);
    comp.deleteItem(0);
    expect(comp.items).toEqual([]);
  });

  it('should not be able to delete when not deletable', () => {
    const comp = mountComponent(Chips, {...test2, deletable: false});
    expect(comp.items).toEqual(['one', 'two', 'three']);
    comp.deleteItem();
    expect(comp.items).toEqual(['one', 'two', 'three']);
  });

  it('should not be able to delete when index is invalid', () => {
    const comp = mountComponent(Chips, test2);
    expect(comp.items).toEqual(['one', 'two', 'three']);
    comp.deleteItem();
    expect(comp.items).toEqual(['one', 'two', 'three']);
    comp.deleteItem(-1);
    expect(comp.items).toEqual(['one', 'two', 'three']);
    comp.deleteItem(comp.items.length);
    expect(comp.items).toEqual(['one', 'two', 'three']);
  });

  it('should not be able to add or delete when readonly', () => {
    const comp = mountComponent(Chips, {...test2, readonly: true});
    expect(comp.items).toEqual(['one', 'two', 'three']);
    comp.deleteItem(0);
    expect(comp.items).toEqual(['one', 'two', 'three']);
    comp.value = 'new';
    comp.addItem();
    expect(comp.items).toEqual(['one', 'two', 'three']);
  });

  it('should not be able to add a duplicate when unique is true', () => {
    const comp = mountComponent(Chips, test2);
    comp.value = 'one';
    comp.addItem();
    Vue.nextTick(() => {
      expect(comp.items).toEqual(['one', 'two', 'three']);
    });
  });

  it('should be able to add a duplicate when unique is false', () => {
    const comp = mountComponent(Chips, {...test2, unique: false});
    comp.value = 'one';
    comp.addItem();
    Vue.nextTick(() => {
      expect(comp.items).toEqual(['one', 'two', 'three', 'one']);
    });
  });

  it('should be able to sort items', () => {
    const comp = mountComponent(Chips, test2);
    comp.sort();
    expect(comp.items).toEqual(['one', 'three', 'two']);
  });
});
