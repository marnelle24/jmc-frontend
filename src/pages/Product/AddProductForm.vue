<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
            <card>
              <h4 slot="header" class="card-title">Add New Product</h4>
              <!-- <pre>{{productError}}</pre> -->
              <form @submit.prevent="saveProduct()">
                <div class="row">
                  <div class="col-md-12">
                    <base-input type="text"
                              label="Product Name"
                              placeholder="Product Name"
                              :hasValidation="productError.errors ? true : false"
                              :validationMsg="productError.errors ? productError.errors.name[0] : ''"
                              v-model="product.name">
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Description</label>
                      <textarea rows="5" class="form-control border-input"
                                placeholder="Here can be your description"
                                v-model="product.description">
                        </textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input type="text"
                              label="Item Unit"
                              placeholder="Item unit (ex. Kg, pcs, sack)"
                              v-model="product.itemUnit">
                    </base-input>
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-info btn-fill float-right rounded-0">Save</button>
                </div>
                <div class="clearfix"></div>
              </form>
            </card>
        </div>
        <div class="col-md-4">
            <ProductCard></ProductCard>
            <ProductCategory></ProductCategory>
        </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import { mapActions, mapGetters } from 'vuex'
  import ProductCard from './ProductCard'
  import ProductCategory from './ProductCategory.vue'

  export default {
    components: {
      Card,
      ProductCard,
      ProductCategory
    },
    data() {
        return {
            product: {
                name: null,
                description: null,
                itemUnit: null,
                categories: []
            }
        }
    },
    computed: {
        ...mapGetters({
            productError: 'product/product_error'
        })
    },
    methods: {
        ...mapActions({
            storeProduct: 'product/saveProduct'
        }),
        saveProduct ()
        {
            this.storeProduct(this.product)
                .then((response) => {

                    if(response)
                    {

                      this.$toast.open({
                          message: 'Product added successfully',
                          type: 'success',
                          duration: 2000,
                          dismissable: true
                      })
                      this.$router.push(`/products`)
                    }
                    else
                    {
                      this.$toast.open({
                          message: 'Product information incomplete',
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
