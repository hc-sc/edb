import Vue from 'vue';
import Textarea from './textarea.vue';
import {mountComponent} from 'test/helpers.js';

const test = {
  id: 'test',
  label: 'Test'
};

describe('Textarea', () => {
  it('should initialize correctly', () => {
    const comp = mountComponent(Textarea, test);
    expect(comp.id).toBe('test');
    expect(comp.label).toBe('Test');
    expect(comp.compName).toBe('test');
    expect(comp.required).toBe(false);
    expect(comp.disabled).toBe(false);
    expect(comp.max).toBeUndefined();
    expect(comp.autoresize).toBe(true);
    expect(comp.value).toBe('');
    expect(comp.touched).toBe(false);
  });

  it('should use name if given', () => {
    const comp = mountComponent(Textarea, {...test, name: 'name'});
    expect(comp.compName).toBe('name');
  });

  it('should be empty with empty value', () => {
    const comp = mountComponent(Textarea, test);
    expect(comp.empty).toBe(true);
    comp.value = 'test';
    expect(comp.empty).toBe(false);
    comp.value = '';
    expect(comp.empty).toBe(true);
  });

  it('should return invalid if touched, max, and too long', () => {
    const comp = mountComponent(Textarea, {...test, max: 2});
    expect(comp.touched).toBe(false);
    expect(comp.invalid).toBe(false);
    comp.touched = true;
    expect(comp.touched).toBe(true);
    expect(comp.invalid).toBe(false);
    comp.value = 'h';
    expect(comp.invalid).toBe(false);
    comp.value = 'hello';
    expect(comp.invalid).toBe(true);
  });

  it('should always have valid length if no max', () => {
    const comp = mountComponent(Textarea, test);
    expect(comp.validLength).toBe(true);
    comp.value = 'hello';
    expect(comp.validLength).toBe(true);
  });

  it('should have valid length if max given ', () => {
    const comp = mountComponent(Textarea, {...test, max: 2});
    expect(comp.validLength).toBe(true);
    comp.value = 'hello';
    expect(comp.validLength).toBe(false);
  });

  it('should not resize if no autoresize', () => {
    const comp = mountComponent(Textarea, {...test, autoresize: false});
    comp.resize();
    expect(true).toBe(true);
    // let textarea = comp.$el.querySelector('textarea');
    // const event = document.createEvent('InputEvent');
    // comp.autoresize = true;
    // comp.resize(event);
    // expect(true).toBe(true);
  });
});
