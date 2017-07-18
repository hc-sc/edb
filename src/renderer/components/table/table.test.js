import Vue from 'vue';
import Table from './table.vue';
import {mountComponent} from 'test/helpers.js';

const test = {
  id: 'test'
};

const test2 = {
  id: 'test',
  headers: ['id', 'name'],
  items: [
    {id: 1, name: 'One'},
    {id: 2, name: 'Two'}
  ]
};

const test3 = {
  id: 'test',
  url: 'http://test.com'
};

describe('Table', () => {
  it('should initialize correctly', () => {
    const comp = mountComponent(Table, test);
    expect(comp.id).toBe('test');
    expect(comp.selectable).toBe(false);
    expect(comp.filterable).toBe(false);
    expect(comp.sortable).toBe(false);
    expect(comp.pageable).toBe(false);
    expect(comp.headers).toEqual([]);
    expect(comp.items).toEqual([]);
    expect(comp.url).toBeUndefined();
    expect(comp.filters).toEqual([]);
    expect(comp.offset).toBe(0);
    expect(comp.pageSize).toBe(10);
    expect(comp.sortColumn).toBeUndefined();
    expect(comp.desc).toBe(false);
    expect(comp.loading).toBe(false);
  });

  it('should initialize correctly with items', () => {
    const comp = mountComponent(Table, test2);
    expect(comp.headers).toEqual(['id', 'name']);
    expect(comp.count).toBe(2);
    expect(comp.queryResults).toEqual(test2.items);
    expect(comp.rows).toEqual(test2.items);
  });

  it('should be limited by pageSize', () => {
    const comp = mountComponent(Table, test2);
    comp.pageSize = 1;
    expect(comp.items).toEqual(test2.items);
    expect(comp.rows).toEqual([test2.items[0]]);
  });

  it('should update offset', () => {
    const comp = mountComponent(Table, test);
    expect(comp.offset).toBe(0);
    comp.changeOffset(2);
    expect(comp.offset).toBe(2);
  });

  it('should emit on select when selectable', () => {
    const comp = mountComponent(Table, test2);
    spyOn(comp, 'select');
    expect(comp.selectable).toBe(false);
    comp.select(0);
    expect(comp.select).toHaveBeenCalled();
    comp.selectable = true;
    expect(comp.selectable).toBe(true);
    comp.select(0);
    expect(comp.select).toHaveBeenCalled();
  });

  it('should add and delete filters', () => {
    const comp = mountComponent(Table, test2);
    expect(comp.filters).toEqual([]);
    comp.addFilter();
    expect(comp.filters).toEqual([{filter: 'all', value: ''}]);
    comp.deleteFilter(0);
    expect(comp.filters).toEqual([]);
  });

  it('should normalize values', () => {
    const comp = mountComponent(Table, test2);
    let result = comp.$options.filters.normalize('test_case');
    expect(result).toBe('Test Case');
    comp.items = [{id: 1, name: {value: 'one', display: 'One'}}];
    result = comp.$options.filters.normalize(comp.items[0].name);
    expect(result).toBe('One');
  });

  it('should sort correctly', () => {
    const comp = mountComponent(Table, test2);
    console.log(comp.sortColumn);
    expect(comp.sortColumn).toBe('id');
    expect(comp.desc).toBe(false);
    comp.sort('id');
    expect(comp.sortColumn).toBe('id');
    expect(comp.desc).toBe(true);
    comp.sort('name');
    expect(comp.sortColumn).toBe('name');
    expect(comp.desc).toBe(false);
    comp.sort('name');
    expect(comp.sortColumn).toBe('name');
    expect(comp.desc).toBe(true);
  });

  describe('url', () => {
    // it('should add backend service if url', () => {
    //   spyOn(Table, 'created');
    //   const comp = mountComponent(Table, test3);
    //   expect(comp.url).toBe(test3.url);
    // });
  });
});
