<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card class="strpied-tabled-with-hover" headerClasses="mb-5 mt-3" body-classes="table-full-width table-responsive">
                <template slot="header">
                    <div class="d-flex justify-content-between">
                      <h4 class="card-title">Product Inventory</h4>
                      <router-link :to="{ path:'/transaction/new' }" class="btn btn-md bg-primary text-white text-uppercase">
                        <i class="nc-icon nc-simple-add"></i> Add Transaction
                      </router-link>
                    </div>
                    <p class="card-category">Products available in the inventory.</p>
                </template>
                <template slot="raw-content">
                  <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quanitity</th>
                        <th>Selling Price</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data, index) in 10" :key="index">
                        <td><small>{{(index+1)}}</small></td>
                        <td><small>ProductName{{index+1}}</small></td>
                        <td>
                          <span v-for="(category, index) in 3" :key="index" class="badge badge-pill badge-primary text-white mr-1">
                            <small>CategoryName{{index+1}}</small>
                          </span>
                        </td>
                        <td><small>100</small></td>
                        <td><small>10</small></td>
                        <td class="icons-in-table">
                          <router-link :to="`/product/${data.slug}`"><i class="mx-1 nc-icon nc-album-2"></i></router-link>
                          <a style="cursor:pointer;"><i class="mx-1 nc-icon nc-simple-remove text-danger"></i></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </template>
            </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card'
  export default {
    components: {
      Card
    },

  }
</script>
<style scoped>
  .icons-in-table {
      display: inline-block !important;
      text-align: right !important;
  }
</style>
