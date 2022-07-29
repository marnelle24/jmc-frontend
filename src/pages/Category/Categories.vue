<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card class="strpied-tabled-with-hover" headerClasses="mb-5 mt-3" body-classes="table-full-width table-responsive">
                <template slot="header">
                    <div class="d-flex justify-content-between">
                      <h4 class="card-title">Category List</h4>
                      <router-link :to="{ path:'/category/new' }" class="btn btn-md bg-primary text-white text-uppercase">
                        <i class="nc-icon nc-simple-add"></i> Add New Category
                      </router-link>
                    </div>
                    <p class="card-category">Lists of all the category in the system.</p>
                </template>
                <template slot="raw-content">
                  <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data, index) in categoryList" :key="index">
                        <td><small>{{(index+1)}}</small></td>
                        <td><small>{{data.name}}</small></td>
                        <td><small>{{data.description}}</small></td>
                        <td class="icons-in-table">
                          <router-link :to="`/category/${data.slug}`"><i class="mx-1 nc-icon nc-album-2"></i></router-link>
                          <a style="cursor:pointer;" @click.prevent="removeCategory(data)"><i class="mx-1 nc-icon nc-simple-remove text-danger"></i></a>
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
    computed: {
      ...mapGetters({
        categoryList: 'category/categories'
      })
    },
    methods: {
      ...mapActions( {
        allCategories: 'category/allCategories',
        deleteCategory: 'category/deleteCategory'
      }),
      async removeCategory(category) {
        await this.deleteCategory(category.id)
          .then(() => {
            const getRecord = this.categoryList.indexOf(category);
            this.categoryList.splice(getRecord, 1);
          })

        this.$toast.open({
            message: 'Category removed successfully',
            type: 'error',
            duration: 2000,
            dismissable: true
        })
      }
    },
    created() {
      this.allCategories()
    },
  }
</script>
<style scoped>
  .icons-in-table {
      display: inline-block !important;
      text-align: right !important;
  }
</style>
