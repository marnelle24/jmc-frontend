import Vue from 'vue'
import Vuex from 'vuex'

import Product from './modules/Product';
import Category from './modules/Category';
import User from './modules/User';

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user: User,
        product: Product,
        category: Category
    }
});
