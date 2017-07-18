<template>
  <div>
    <h2>Picklists</h2>
    <div class='accordion'>
      <div v-for='(picklist, index) in picklists' class='accordion-group' :aria-expanded='expanded[index]'>
        <div class='accordion-group-title' @click='toggle(index)'>
          {{$t(picklist.name)}}
        </div>
        <div class='accordion-group-content'>
          <ul class='picklist-items'>
            <li v-for='item of picklist.values'>
              <p>{{item.value}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'Picklists',
  data: function() {
    return {
      expanded: [],
      autoCollapse: true
    };
  },
  computed: {
    ...mapState(['picklists'])
  },
  methods: {
    toggle(index) {
      if (this.autoCollapse) {
        this.expanded = this.expanded.map((item, mapIndex) => {
          return (index === mapIndex) ? item : false;
        });
      }

      // this only works because VueJS augments splice to have reactive watchers
      this.expanded.splice(index, 1, !this.expanded[index]);
    }
  }
};
</script>

<style scoped>
.picklist-items {
  list-style: none;
}

.accordion {
  border-radius: 2px;
  overflow: hidden;
  box-shadow: var(--depth-1);
}

.accordion-group:not(:first-child) {
  border-top: 1px solid lightgray;
}

.accordion-group-title {
  cursor: pointer;
  min-height: 3rem;
  line-height: 3rem;
  padding: 0 1rem;
}

.accordion-group-content {
  background-color: var(--divider);
  font-size: .85rem;
  padding: 0;
  height: 0;
  overflow: hidden;
  display: block;
}

.accordion-group .accordion-group-content {
  border-top: 1px solid lightgray;
}

.accordion .accordion-group-content {
  transition: none;
}

.accordion-group[aria-expanded=true] .accordion-group-content {
  height: auto;
}
</style>
