import axios from "axios";
import store from "../store";
import router from "../routes/routes";

const api = axios.create({
    baseURL: 'http://localhost:8200/api/'
    // baseURL: process.env.VUE_APP_APIURL
})

api.defaults.withCredentials = true;

api.interceptors.response.use(null,(error) => {

    if(error.response.status === 401) {
        store.dispatch('user/logout');
        router.push('login');
        // store.state.user.isExpiredAuth = true;
    }
    return Promise.reject(error);

});

export default api;
