<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card class="strpied-tabled-with-hover" headerClasses="mb-5 mt-3" body-classes="table-full-width table-responsive">
                <template slot="header">
                    <div class="d-flex justify-content-between">
                      <h4 class="card-title">Product Masterlist</h4>
                      <router-link :to="{ path:'/product/new' }" class="btn btn-md bg-primary text-white text-uppercase">
                        <i class="nc-icon nc-simple-add"></i> Add New Product
                      </router-link>
                    </div>
                    <p class="card-category">Lists of all the product in the system.</p>
                </template>
                <template slot="raw-content">
                  <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Item Unit</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data, index) in productList" :key="index">
                        <td><small>{{(index+1)}}</small></td>
                        <td><small>{{data.name}}</small></td>
                        <td>
                          <span v-for="category in data.categories" :key="category.id" class="badge badge-pill badge-primary text-white mr-1">
                            <small>{{category.name}}</small>
                          </span>
                        </td>
                        <td><small>{{data.itemUnit}}</small></td>
                        <td class="icons-in-table">
                          <router-link :to="`/product/${data.slug}`"><i class="mx-1 nc-icon nc-album-2"></i></router-link>
                          <a style="cursor:pointer;" @click.prevent="removeProduct(data)"><i class="mx-1 nc-icon nc-simple-remove text-danger"></i></a>
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
  import { mapActions, mapGetters } from 'vuex'
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
      Card
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        productList: 'product/allProducts'
      })
    },
    methods: {
      ...mapActions( {
        allProducts: 'product/allProducts',
        deleteProduct: 'product/deleteProduct'
      }),
      async removeProduct(product) {
        await this.deleteProduct(product.id)
          .then(() => {
            const getRecord = this.productList.indexOf(product);
            this.productList.splice(getRecord, 1);
          })

        this.$toast.open({
            message: 'Product removed successfully',
            type: 'error',
            duration: 2000,
            dismissable: true
        })
      }
    },
    created() {
      this.allProducts()
    },
  }
</script>
<style scoped>
  .icons-in-table {
      display: inline-block !important;
      text-align: right !important;
  }
</style>
