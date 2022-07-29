import User from "@/api/User";
import router from "../../routes/routes";

const user = User.getLoggedInUser();

export default {
    namespaced: true,

    state: {
        currentUser: user,
        isLoggedIn: !!user,
        handleValidation: [],
        isLoading: false,
        isEmpty: false,
        isSearching: false,
        auth_error: [],
        handleError: null,
        isExpiredAuth: false,

        users: []
    },

    getters: {
        currentUser(state) {
            return state.currentUser
        },
    
        isLoggedIn(state) {
            return state.isLoggedIn
        },
    
        authError(state) {
            return state.auth_error
        },
        users(state) {
            return state.users
        },
    },

    actions: {
        async login({commit}, payload) {
        
            await User.login(payload)
                .then(response => {
                    commit('LOGIN_SUCCESS', response.data)
                })
                .catch(error => {
                    commit('LOGIN_FAILED', error.response)
                })
        },
    
        logout({commit}) {
            User.logout()
                .then(() => {
                    commit('LOGOUT')
                    router.push('/');
                });
        },
    
        getUsers({commit}) {

            return User.get()
                .then((response) => {
                    commit('USERS', response.data)
                })
                .catch((error) => {
                    commit('HANDLE_ERROR', error.response)
                })            
        },
    
    },

    mutations: {
        HANDLE_VALIDATION(state, payload) {
            state.handleValidation = payload.data.errors;
        },
    
        HANDLE_ERROR(state, payload) {
            state.handleError = payload;
        },
    
        LOGIN_SUCCESS(state, payload) {
            state.isLoading = false
            state.isLoggedIn = true
            state.currentUser = payload
            localStorage.setItem("user", JSON.stringify(state.currentUser))
            state.auth_error = []
        },
        
        LOGIN_FAILED(state, payload) {
            state.isLoading = false
            state.isLoggedIn = false
            state.auth_error = []
            if(payload.status === 422) {
                state.auth_error = payload.data.errors
            } 
            else if(payload.status === 419) {
                state.auth_error = {
                        'noToken': payload.data.message
                    }
            }
        },
        
        LOGOUT(state) {
            state.isLoading = false
            state.isLoggedIn = false
            state.auth_error = []
            state.currentUser = null
        },
    
        USERS(state, usersData) {
            state.users = usersData;
        },
    }

}