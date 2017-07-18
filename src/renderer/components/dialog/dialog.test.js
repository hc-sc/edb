import Vue from 'vue';
import Dialog from './dialog.vue';
import {mountComponent} from 'test/helpers.js';

const test1 = {
  id: 'test'
};

describe('Dialog', () => {
  it('should initialize correctly', () => {
    const comp = mountComponent(Dialog, test1);
    expect(comp.id).toBe('test');
  });

  it('should have the dialog be closed on created', () => {
    const comp = mountComponent(Dialog, test1);
    expect(comp.expanded).toBe(false);
  });

  it('should close when open', () => {
    const comp = mountComponent(Dialog, test1);
    comp.expanded = true;
    comp.close();
    expect(comp.expanded).toBe(false);
  });

  it('should emit and close when clicking actions', () => {
    const comp = mountComponent(Dialog, test1);
    spyOn(comp, 'emit').and.callThrough();
    spyOn(comp, 'close');
    comp.emit('confirm');
    expect(comp.emit).toHaveBeenCalled();
    expect(comp.expanded).toBe(false);
    expect(comp.close).toHaveBeenCalled();
  });
});
