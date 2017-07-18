import Vue from 'vue';
import Menu from './menu.vue';
import {mountComponent} from 'test/helpers.js';

const test = {
  id: 'test'
};

describe('Menu', () => {
  it('should initialize correctly', () => {
    const comp = mountComponent(Menu, test);
    expect(comp.id).toBe('test');
    expect(comp.label).toBeUndefined();
    expect(comp.items).toEqual([]);
    expect(comp.persist).toBe(false);
    expect(comp.expanded).toBe(false);
    expect(comp.selected).toBeUndefined();
  });

  it('should open when closed and button is clicked', () => {
    const comp = mountComponent(Menu, test);
    expect(comp.expanded).toBe(false);
    comp.open();
    expect(comp.expanded).toBe(true);
  });

  it('should not add events listeners if no items', () => {
    const comp = mountComponent(Menu, test);
    expect(document.onclick).toBeNull();
    comp.open();
    expect(document.onclick).toBeNull();
  });

  it('should add listeners if there are items', () => {
    const comp = mountComponent(Menu, {...test, items: ['one', 'two']});
    expect(document.onclick).toBeNull();
    comp.open();
    expect(document.onclick).toBeDefined();
  });

  it('should select a new item', () => {
    const comp = mountComponent(Menu, {...test, items: ['one', 'two']});
    expect(comp.selected).toBeUndefined();
    comp.select(0);
    expect(comp.selected).toBe(0);
  });

  it('should add a style tag after mount', () => {
    const comp = new mountComponent(Menu, {...test, items: ['one', 'two']});
    expect(comp._isMounted).toBe(true);
    expect(comp.$el.firstChild.tagName).toBe('STYLE');
  });

    // these need mock events
  it('should close when open', () => {
    // const comp = mountComponent(Menu, test);
    // comp.open();
    // expect(document.onclick).toBeDefined();
    // comp.close();
    // expect(comp.expanded).toBe(false);
    // expect(document.onclick).toBeNull();
  });

  it('should toggle open and closed', () => {
    // const comp = mountComponent(Menu, test);
    // expect(comp.expanded).toBe(false);
    // comp.toggle();
    // expect(comp.expanded).toBe(true);
    // comp.toggle();
    // expect(comp.expanded).toBe(false);
  });

  it('should cycle up and down presses', () => {
    const comp = mountComponent(Menu, {...test, items: ['one', 'two']});
    // const nodes = comp.$el.querySelectorAll('[role^=menuitem]');
    // const event = document.createEvent('KeyboardEvent');
    // event.initKeyboardEvent('keyup', false, false, null, 38);
    // console.log(event);
  });
});
