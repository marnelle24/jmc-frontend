<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <card>
                  <!-- <pre>{{productError}}</pre> -->
                  <h4 slot="header" class="card-title">Edit Product Information</h4>
                  <form v-if="product" @submit.prevent="updateProfile()">
                    <div class="row">
                      <div class="col-md-12">
                        <base-input type="text"
                                  label="Product Name"
                                  :hasValidation="productError.errors ? true : false"
                                  :validationMsg="productError.errors ? productError.errors.name[0] : ''"
                                  placeholder="Product Name"
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
                      <button type="submit" class="btn btn-info btn-fill float-right rounded-0">
                        Update Information
                      </button>
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
  import ProductCard from './ProductCard'
  import ProductCategory from './ProductCategory.vue'
  import { mapActions, mapGetters } from 'vuex';

  export default {
    components: {
      Card,
      ProductCard,
      ProductCategory
    },
    computed: {
      ...mapGetters({
        product: 'product/getProduct',
        productError: 'product/product_error'
      })
    },
    created() {
      this.getProduct(this.$route.params.slug)
    },
    methods: {
      ...mapActions({
        getProduct: 'product/getProduct',
        updateProduct: 'product/updateProduct'
      }),

      async updateProfile () {
        await this.updateProduct(this.product)
          .then((response) => {
            if(response)
            {

              this.$toast.open({
                  message: 'Product updated successfully',
                  type: 'success',
                  duration: 2000,
                  dismissable: true
              })
              this.$store.commit('product/PRODUCT_ERROR', [])
              this.$router.push(`/product/${this.product.slug}`)
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
