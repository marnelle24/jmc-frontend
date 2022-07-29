<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column" :class="{ 'justify-content-end': column === 'actions' }">{{column}}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" :class="{ 'justify-content-end': column === 'actions' }">
          <template v-if="hasValue(item, column)">
            <template v-if="column !== 'actions'">{{itemValue(item, column)}}</template>
            <span v-else v-html="hasAction(item)"></span>
          </template>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
  
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array,
      actions: Array
    },
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      hasAction(item) {

        let output = '';
        let actionIcon = '<i class="nc-icon nc-tap-01"></i>';
        let setIcon = '';
        let setPath = '';

        //get the 1st key of the object as the index/unique data in the record
        let indexRecord = Object.keys(item)[0];

        // loop the action array to get the set of actions
        item.actions.forEach((value, key) => {
          setIcon = (value.icon === 'undefined') ? actionIcon : value.icon; 
          if(value.name === 'View') {
            setPath = value.path+'/'+item[indexRecord];
          }
          else if(value.name === 'Update') {
            setPath = value.path+'/'+item[indexRecord];
          }
          else if(value.name === 'Delete') {
            setPath = value.path+'/'+item[indexRecord];
          }
          output += `<a href="${setPath}" class="mr-2">${setIcon}</a>`
        })
        return output;
      }
    },
    created() {
      if(this.actions) {
        this.columns.push('actions');
        this.data.forEach((value, index) => {
          this.data[index]['actions'] = this.actions
        });
      }
    }
  }
</script>
<style>
</style>
