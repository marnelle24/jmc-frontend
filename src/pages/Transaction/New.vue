<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card class="strpied-tabled-with-hover" headerClasses="mb-5 mt-3" body-classes="table-full-width table-responsive">
                <template slot="header">
                    <div class="d-flex justify-content-between">
                      <h4 class="card-title">Create New Transaction</h4>
                    </div>
                    <p class="card-category">Please select what type of transaction you want to create.</p>
                    <div class="row mt-5">
                      <div class="col-md-12">
                        <multiselect
                          v-model="transactionType"
                          :options="transactions"
                          placeholder="Please select type of transaction"
                          track-by="name"
                          label="name" />
                      </div>
                    </div>
                </template>
                <template slot="raw-content">
                </template>
            </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card'
  import Multiselect from 'vue-multiselect';
  export default {
    components: {
      Card,
      Multiselect
    },

    data() {
      return {
        transactionType: null,
        transactions: [
          {
            "name": 'Manual Inventory'
          },
          {
            "name": 'Item Transfer'
          },
          {
            "name": 'Purchase Order'
          },
          {
            "name": 'Sales Order'
          }
        ]
      }
    }

  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
  .icons-in-table {
      display: inline-block !important;
      text-align: right !important;
  }
</style>
