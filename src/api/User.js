import Api from "./Api";
import Csrf from "./Csrf";

export default {

    async register(form) {
        await Csrf.getCookie();
        return Api.post('/register', form);
    },

    async login(form) {
        await Csrf.getCookie();
        return Api.post('/login', form);
    },

    async logout() {
      await Csrf.getCookie();
      await Csrf.removeXSRFCookie();
      localStorage.removeItem('user');
      return Api.post('/logout');
    },

    auth() {
        return Api.get('/user');
    },

    getLoggedInUser() {
        const userStr = localStorage.getItem('user');

        if(!userStr) {
            return null;
        }
        return JSON.parse(userStr)

    },

    // get all users
    async get() {
        await Csrf.getCookie();
        return Api.get('/users');
    },

}
