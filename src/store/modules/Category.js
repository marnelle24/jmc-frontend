import Category from "@/api/Category";
export default {
    namespaced: true,

    state: {
        categories: [],
        category: {},
        category_error: []
    },

    getters: {
        category_error(state) {
          return state.category_error;
        },
        categories(state) {
            return state.categories
        },
        category(state) {
            return state.category
        }
    },

    actions: {
        async allCategories({commit}) {
          await Category.all()
            .then((response) => {
              commit('CATEGORIES', response.data);
            })
            .catch((errors) => {
              commit('CATEGORIES_ERROR', errors.data);
            })
        },

        async getCategory({commit}, slug) {
          await Category.getCategory(slug)
              .then((response) => {
                  commit('CATEGORY', response.data)
              })
              .catch((errors) => {
                  console.log(errors)
              })
        },
        saveCategory({commit}, category_data) {
          return Category.save(category_data)
              .then((response) => {
                  commit('CATEGORY', response.data)
                  return true
              })
              .catch((errors) => {
                  commit('CATEGORIES_ERROR', errors.response.data)
              })
        },
        updateCategory({commit}, category_data) {
          return Category.update(category_data)
              .then((response) => {
                  commit('CATEGORY', response.data)
                  return true
              })
              .catch((errors) => {
                  commit('CATEGORIES_ERROR', errors.response.data)
              })
        },
        deleteCategory({commit}, payload) {
          return Category.delete(payload)
              .then(() => {
                return true
              })
              .catch((errors) => {
                commit('CATEGORIES_ERROR', errors.data)
              })
        }
    },

    mutations: {
        CATEGORIES_ERROR(state, payload) {
          state.category_error = payload;
        },
        CATEGORIES(state, payload) {
            state.categories = payload;
        },
        CATEGORY(state, payload) {
            return state.category = payload
        },
    }

}
