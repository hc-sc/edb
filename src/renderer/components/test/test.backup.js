import Vue from 'vue';
import Test from './test.vue';

const propsData = {
  items: ['one', 'two', 'three']
};

describe('Test', () => {
  it('should have list items', () => {
    const Ctor = Vue.extend(Test);
    const comp = new Ctor({propsData}).$mount();
    Vue.nextTick(() => {
      expect(comp.items).toEqual(['one', 'two', 'three']);
    });
  });
});
