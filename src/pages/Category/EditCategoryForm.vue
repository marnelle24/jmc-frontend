<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <card>
                  <!-- <pre>{{category}}</pre> -->
                  <h4 slot="header" class="card-title">Edit Category Information</h4>
                  <form v-if="category" @submit.prevent="updateProfile()">
                    <div class="row">
                      <div class="col-md-12">
                        <base-input type="text"
                                  label="Category Name"
                                  :hasValidation="categoryError.errors ? true : false"
                                  :validationMsg="categoryError.errors ? categoryError.errors.name[0] : ''"
                                  placeholder="Category Name"
                                  v-model="category.name">
                        </base-input>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Description</label>
                          <textarea rows="5" class="form-control border-input"
                                    placeholder="Here can be your description"
                                    v-model="category.description">
                            </textarea>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <button type="submit" class="btn btn-info btn-fill float-right rounded-0">
                        Update Information
                      </button>
                    </div>
                    <div class="clearfix"></div>
                  </form>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import { mapActions, mapGetters } from 'vuex';

  export default {
    components: {
      Card,
    },
    computed: {
      ...mapGetters({
        category: 'category/category',
        categoryError: 'category/category_error'
      })
    },
    created() {
      this.getCategory(this.$route.params.slug)
    },
    methods: {
      ...mapActions({
        getCategory: 'category/getCategory',
        updateCategory: 'category/updateCategory'
      }),

      async updateProfile () {
        await this.updateCategory(this.category)
          .then((response) => {
            if(response)
            {
              this.$toast.open({
                  message: 'Category updated successfully',
                  type: 'success',
                  duration: 2000,
                  dismissable: true
              })
              this.$store.commit('category/CATEGORIES_ERROR', [])
              this.$router.push(`/category/${this.category.slug}`)
            }
            else
            {
              this.$toast.open({
                  message: 'Category information incomplete',
                  type: 'error',
                  duration: 2000,
                  dismissable: true
              })
            }
          })
          .catch((errors) => {
            console.log(errors)
          })

      },
    }
  }

</script>
<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }

</style>
