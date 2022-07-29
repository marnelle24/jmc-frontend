import Product from "@/api/Product";

export default {
    namespaced: true,

    state: {
        products: [],
        product: {},
        productCategory: [],
        product_error: []
    },

    getters: {
        product_error(state) {
            return state.product_error
        },
        productCategory(state) {
          return state.productCategory
        },
        allProducts(state) {
            return state.products
        },
        getProduct(state) {
            return state.product
        }
    },

    actions: {
        async allProducts({commit}) {
            await Product.all()
                .then((response) => {
                    commit('PRODUCTS', response.data)
                })
                .catch((errors) => {
                  console.log(errors)
                })

      },
      async getProduct({commit}, slug) {
        await Product.getProduct(slug)
            .then((response) => {
                commit('PRODUCT', response.data)
            })
            .catch((errors) => {
                console.log(errors)
            })
      },
      saveProduct({commit, state}, product_data) {
        product_data.categories = state.productCategory
        return Product.save(product_data)
            .then((response) => {
                commit('PRODUCT', response.data)
                return true
            })
            .catch((errors) => {
                commit('PRODUCT_ERROR', errors.response.data)
            })
      },
      updateProduct({commit, state}, product_data) {
        product_data.categories = state.productCategory
        return Product.update(product_data)
            .then((response) => {
                commit('PRODUCT', response.data)
                return true
            })
            .catch((errors) => {
                commit('PRODUCT_ERROR', errors.response.data)
            })
      },
      deleteProduct({commit}, payload) {
        return Product.delete(payload)
            .then(() => {
              return true
            })
            .catch((errors) => {
              commit('PRODUCT_ERROR', errors.data)
            })
      }
    },

    mutations: {
        PRODUCT_ERROR(state, payload) {
            state.product_error = payload;
        },
        PRODUCTS(state, payload) {
            state.products = payload;
        },
        PRODUCT(state, payload) {
            return state.product = payload
        },
        GET_PRODUCT_CATEGORY(state, payload) {
          state.productCategory = payload;
      },

    }

}
