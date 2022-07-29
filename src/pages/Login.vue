<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 px-0">
                <div class="limiter">
                    <div class="container-login100">
                        <div class="wrap-login100 p-t-30 p-b-50">
                            <span class="login100-form-title mb-4">
                                Account Login
                            </span>
                            <form @submit.prevent="login()" class="login100-form validate-form">
                                <div class="wrap-input100 validate-input" :class="{ 'error_login': authError.email || authError.notFound }">
                                    <input type="email" v-model="form.email" class="input100" placeholder="Username/Email" id="email" />
                                </div>
                                <small class="text-danger" v-if="authError.email">{{ authError.email[0] }}</small>
    
                                <div class="wrap-input100 validate-input" :class="{ 'error_login': authError.password || authError.notFound }">
                                    <input type="password" v-model="form.password" class="input100" id="password" placeholder="Password" />
                                </div>
    
                                <small class="text-danger" v-if="authError.password">{{ authError.password[0] }}</small>
    
                                <div class="container-login100-form-btn py-4">
                                    <small class="alert alert-danger" v-if="isExpiredAuth">
                                        You have been logout due to authentication expired. Please login again.
                                    </small>
                                    <small class="alert alert-danger" v-if="authError.notFound">{{ authError.notFound[0] }}</small>
                                    <small class="alert alert-danger" v-if="authError.noToken"><strong>Unauthorized:</strong> Not connected to API token. Please contact administrator.</small>
                                    <button type="submit" class="login100-form-btn" :disabled="loadingLoggedIn" :class="{ 'disabled-btn': loadingLoggedIn }">
                                        <span v-if="!loadingLoggedIn">Login</span>
                                        <span v-else>loading...</span>
                                    </button>
                                </div>
                                <div class="container-login100-form-btn">
                                    <p>No account yet? <a href="/register">Sign Up here</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'Login',
        components: {
        },
        data() {
            return {
                form: {
                    email: 'london17@example.net',
                    password: '1234'
                },
                loadingLoggedIn: false
            };
        },
        computed: {
            ...mapGetters({
                authError: 'user/authError',
                currentUser: 'user/currentUser'
            }),
            ...mapState({
                isExpiredAuth: 'isExpiredAuth'
            })
        },

        methods: {

            login() {
                this.$store.state.user.isExpiredAuth = false;
                this.loadingLoggedIn = true;

                setTimeout(() => {
                    this.$store.dispatch('user/login', this.form)
                        .then(() => {
                            this.$router.push('/overview');
                        })
                        .finally(() => {
                            this.loadingLoggedIn = false;
                        })
                }, 1500);
                
                
            },

        }


    };

</script>
<style scoped>
    .disabled-btn {
        background: #292728 !important;
    }

    .login100-form .text-danger {
        margin-left: 20px !important;
    }

    .error_login {
        border-bottom: 1px solid #dc3545 !important;
    }

    a {
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
	outline: none !important;
}

a:hover {
    text-decoration: none;
    color: #dc3545;
}

/*---------------------------------------------*/
h1,h2,h3,h4,h5,h6 {
	margin: 0px;
}

p {
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
}

ul, li {
	margin: 0px;
	list-style-type: none;
}


/*---------------------------------------------*/
input {
	outline: none;
	border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }
textarea:focus:-ms-input-placeholder { color:transparent; }

input::-webkit-input-placeholder { color: #555555;}
input:-moz-placeholder { color: #555555;}
input::-moz-placeholder { color: #555555;}
input:-ms-input-placeholder { color: #555555;}

textarea::-webkit-input-placeholder { color: #555555;}
textarea:-moz-placeholder { color: #555555;}
textarea::-moz-placeholder { color: #555555;}
textarea:-ms-input-placeholder { color: #555555;}

label {
  margin: 0;
  display: block;
}

/*---------------------------------------------*/
button {
	outline: none !important;
	border: none;
	background: transparent;
}

button:hover {
	cursor: pointer;
}

.limiter {
    width: 100%;
    margin: 0 auto;
}

.container-login100 {
    background-image: url('/images/login_bg.jpg');
    width: 100%;  
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    z-index: 1;  
}

.container-login100::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.65);
}

.wrap-login100 {
    width: 390px;
    border-radius: 10px;
    overflow: hidden;
    background: transparent;
}


/*------------------------------------------------------------------
[ Form ]*/

.login100-form {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
}

.login100-form-logo {
    font-size: 60px; 
    color: #333333;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 auto;
}

.login100-form-title {
    font-size: 28px;
    color: #fff;
    line-height: 1.2;
    text-align: center;
    text-transform: uppercase;
    display: block;
}


/*------------------------------------------------------------------
[ Input ]*/

.wrap-input100 {
    width: 100%;
    position: relative;
    padding: 29px 0;
}

.input100 {
    font-size: 20px;
    color: #555555;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 50px;
    background: transparent;
    padding: 0 10px 0 30px !important;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
}


.input100:focus {
    padding-left: 60px;
}

/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
    width: 100%;
    padding-inline: 35px !important;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-block: 15px;
}

.login100-form-btn {
    width: 100%;
    margin-top: 20px;
    font-size: 20px;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    font-weight: bolder;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    min-width: 160px;
    height: 50px;
    border-radius: 0px;

    background: #dc3545;

    position: relative;
    z-index: 1;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
}

.login100-form-btn::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 21px;
    background-color: #555555;
    top: 0;
    left: 0;
    opacity: 0;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
}

.login100-form-btn:hover {
    background: #b32230;
}


</style>