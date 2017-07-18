import Vue from 'vue';
import Accordion from './accordion.vue';
import {mountComponent} from 'test/helpers';

const test1 = {
  id: 'test',
  items: ['one', 'two', 'three']
};

const test2 = {
  ...test1,
  autocollapse: false
};

describe('Accordion', () => {
  it('should have items as a prop', () => {
    const comp = mountComponent(Accordion, test1);
    expect(comp.items).toEqual(['one', 'two', 'three']);
  });

  it('should map items to booleans on create', () => {
    const comp = mountComponent(Accordion, test1);
    expect(comp.expanded).toEqual([false, false, false]);
  });

  it('should have injected styles after mounting', () => {
    const comp = mountComponent(Accordion, test1);
    expect(comp._isMounted).toBe(true);
    const node = comp.$el.querySelector('.accordion-item');
    expect(node.firstChild.tagName).toBe('STYLE');
  });

  it('should open a panel on first toggle', () => {
    const comp = mountComponent(Accordion, test1);
    comp.toggle(0);
    Vue.nextTick(() => {
      expect(comp.expanded).toEqual([true, false, false]);
    });
  });

  it('should close all other panels when clicked and when autocollapse is set to true', done => {
    const comp = mountComponent(Accordion, test1);
    comp.expanded = [true, false, false];
    comp.toggle(2);
    Vue.nextTick(() => {
      expect(comp.expanded).toEqual([false, false, true]);
      done();
    });
  });

  it('should leave other panels open when autocollapse is set to false', () => {
    const comp = mountComponent(Accordion, test2);
    comp.expanded = [true, false, false];
    comp.toggle(2);
    Vue.nextTick(() => {
      expect(comp.expanded).toEqual([true, false, true]);
    });
  });
});
