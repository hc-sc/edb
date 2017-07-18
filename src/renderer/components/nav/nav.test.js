import Vue from 'vue';
import Nav from './nav.vue';
import NavItem from './nav-item.vue';
import {mountComponent} from 'test/helpers.js';

const test = {
  id: 'test'
};

describe('Nav', () => {
  it('should initialize correctly', () => {
    const comp = mountComponent(Nav, test);
    expect(comp.id).toBe('test');
    expect(comp.expanded).toBe(false);
    expect(comp.toggleable).toBe(false);
    expect(comp.navs).toEqual([]);
    expect(comp.column).toBe(true);
  });

  it('should toggle expanded', () => {
    const comp = mountComponent(Nav, test);
    expect(comp.expanded).toBe(false);
    comp.toggle();
    expect(comp.expanded).toBe(true);
    comp.toggle();
    expect(comp.expanded).toBe(false);
  });

  // it('should initialize items', () => {
  //   const comp = mountComponent(Nav, {...test, navs: [{label: 'Hello', path: '/'}]});
  //   expect(comp.$el.querySelector('li')).toBeDefined();
  // });

  describe('NavItem', () => {
    it('should mount recursively', () => {
      const comp = mountComponent(NavItem, {...test, nav: {}, depth: 0});
      expect(comp.$options.components['vue-nav-item']).toBeDefined();
    });
  });
});


