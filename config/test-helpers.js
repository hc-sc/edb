import Vue from 'vue';

export function getRenderedComponent(Component, propsData) {
  const Ctor = Vue.extend(Component);
  const vm = new Ctor({propsData: propsData}).$mount();
  return vm.$el;
}
