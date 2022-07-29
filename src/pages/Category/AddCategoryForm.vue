<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
            <card>
              <h4 slot="header" class="card-title">Add New Category</h4>
              <!-- <pre>{{categoryError}}</pre> -->
              <form @submit.prevent="saveProduct()">
                <div class="row">
                  <div class="col-md-12">
                    <base-input type="text"
                              label="Category Name"
                              placeholder="Name"
                              :hasValidation="categoryError.errors ? true : false"
                              :validationMsg="categoryError.errors ? categoryError.errors.name[0] : ''"
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
                  <button type="submit" class="btn btn-info btn-fill float-right rounded-0">Save</button>
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
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      Card,
    },
    data() {
        return {
            category: {
                name: null,
                description: null,
            }
        }
    },
    computed: {
        ...mapGetters({
            categoryError: 'category/category_error'
        })
    },
    methods: {
        ...mapActions({
            storeCategory: 'category/saveCategory'
        }),
        saveProduct ()
        {
            this.storeCategory(this.category)
                .then((response) => {

                    if(response)
                    {
                      this.$toast.open({
                          message: 'Category added successfully',
                          type: 'success',
                          duration: 2000,
                          dismissable: true
                      })
                      this.$router.push(`/categories`)
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
                .catch((error) => {
                    console.log(error)
                })
        }
    }
  }

</script>
<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }

</style>
