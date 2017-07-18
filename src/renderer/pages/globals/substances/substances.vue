<template>
    <vue-split-pane>
      <div slot='left-pane'>
        hello
      </div>
      <div slot='right-pane'>
        <h2>{{$tc('substance', 2)}}</h2>
        <vue-input prefix type='text' id='generatePID' name='generatePID' :label='$t("substancepid")' required>
          <vue-button color='primary'>{{$t('generatepid')}}</vue-button>
        </vue-input>
        <vue-input type='text' id='substancename' name='substancename' :label='$t("substancename")'></vue-input>

        <vue-table :title='$t("otheridentifiers")' searchable pageable>
          <span slot='actions'>
            <span>+</span>
          </span>
          <tr slot='headers'>
            <th class='icon-cell'></th>
            <th v-for='header of headers'>{{header}}</th>
          </tr>
          <tr slot='rows' v-for='row of rows'>
            <td class='icon-cell' @click='deleteRow(row)'>🗑</td>
            <td v-for='header of headers'>{{row[header]}}</td>
          </tr>
        </vue-table>
      </div>
    </vue-split-pane>
</template>

<script>
import SplitPane from '@/components/split-pane/split-pane.vue';
import Input from '@/components/input/input.vue';
import Table from '@/components/table/table.vue';
import Button from '@/components/button/button.vue';

export default {
  name: 'Substances',
  methods: {
    deleteRow(row) {
      console.log(row);
    },
    changePage(obj) {
      console.log(obj.page);
    }
  },
  computed: {
    headers: function() {
      return [
        'identifier',
        'identifiertype'
      ];
    },
    rows: function() {
      return [
        {identifiertype: 'CASNO', identifier: 101898}, {identifiertype: 'ECNO', identifier: 678}
      ];
    }
  },
  components: {
    'vue-split-pane': SplitPane,
    'vue-input': Input,
    'vue-button': Button,
    'vue-table': Table
  }
};
</script>
