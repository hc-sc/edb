import Vue from 'vue';
import Tree from './tree.vue';
import {mountComponent} from 'test/helpers.js';

const test = {
  id: 'test',
  tree: {
    label: 'hello',
    children: []
  }
};

describe('Tree', () => {
  it('should initialize correctly', () => {
    const comp = mountComponent(Tree, test);
    expect(comp.id).toBe('test');
    expect(comp.tree).toBeDefined();
  });

  it('should initialize a tree', () => {
    const comp = mountComponent(Tree, test);
    expect(comp.tree).toEqual({label: 'hello', children: []});
  });

  it('should toggle open', () => {
    const comp = mountComponent(Tree, test);
    expect(comp.open).toBe(false);
    comp.toggle();
    expect(comp.open).toBe(true);
  });

  it('should have hasChildren be correct', () => {
    const comp = mountComponent(Tree, test);
    expect(comp.hasChildren).toBe(false);
    comp.tree.children.push({label: 'one', children: []});
    expect(comp.hasChildren).toBe(true);
  });

  it('should emit', () => {

  });
});
