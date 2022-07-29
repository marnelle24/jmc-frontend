<template>
    <card class="card-category">
        <h5 slot="header" class="card-title">Category:</h5>
        <div class="row">
            <div class="col-md-12">
              <multiselect
                :close-on-select="false"
                :hide-selected="true"
                :multiple="true"
                v-model="newCategory"
                :searchable="false"
                :options="categories"
                :group-select="true"
                placeholder="Search Categories"
                track-by="name"
                label="name" />
            </div>
        </div>
    </card>
</template>
<script>
import Card from 'src/components/Cards/Card.vue'
import Multiselect from 'vue-multiselect';
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        Card,
        Multiselect
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters({
            categories: 'category/categories',
            productCategory: 'product/productCategory',
            product: 'product/getProduct'
        }),
        newCategory: {
          get() {
            return this.productCategory
          },
          set(category) {
            return this.$store.commit('product/GET_PRODUCT_CATEGORY', category)
          }
        }
    },
    async created() {
        await this.allCategories()
        this.newCategory = this.product ? this.product.categories : this.productCategory
    },
    methods: {
        ...mapActions({
            allCategories: 'category/allCategories'
        }),
        addCategory(category) {
            console.log(category);
        }
    }
}

</script>
<!-- Vue Multi-select style -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

  .multiselect__tag {
    background-color: #d2232a !important;
    padding-block:5px;
    line-height: 1;
    color: #fff;
    margin-inline: 5px;
  }

  .multiselect__tag-icon:after {
    color: #fff !important;
  }

  .multiselect__tag-icon:after {
    color: #fff !important;
  }

  .multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
    background-color: #d2232a !important;
  }


</style>
