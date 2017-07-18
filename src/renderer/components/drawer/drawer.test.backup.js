import Vue from 'vue';
import Drawer from './drawer.vue';
import {mountComponent} from 'test/helpers.js';

const test1 = {
  id: 'test'
};

const test2 = {
  ...test1,
  items: ['one', 'two', 'three']
};

describe('Drawer', () => {
  it('should initialize correctly', () => {
    const comp = mountComponent(Drawer, test1);
    expect(comp.id).toBe('test');
    expect(comp.side).toBe('left');
    expect(comp.siblingId).toBeUndefined();
    expect(comp.display).toBe('overlay');
    expect(comp.fullscreen).toBe(false);
    expect(comp.showing).toBe(false);
    expect(comp.items).toBeUndefined();
  });

  it('should have', () => {

  });
});
