import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex);

Vue.config.productionTip = false;
const store = new Vuex.Store({
    state: {
        count: 0,
        username: "",
        password: ""
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--,
        setPassword: (state, newValue) => {
            state.password = newValue
        },
        setUsername: (state, newValue) => {
            state.username = newValue
        },
    },
    getters: {
        password: function (state) {
            return state.password;
        },
        username: function (state) {
            return state.username;
        }
    }
    , actions: {
        logon({commit}, user){
            console.log(user);
            return new Promise((resolve, reject) => {
                axios({url: 'http://localhost:8000/smb_api/accounts/login', data: user, method: 'POST' })
                    .then(resp => {
                        resolve(resp)
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        // login: function (state) {
        //     console.log(state.state.password);
        //     if (state.state.password == "sam" && state.state.username == "sam") {
        //         alert("login success");
        //         return 'success';
        //     } else {
        //         alert("login Failed");
        //     }
        // },
        setPassword: ({commit, state}, newValue) => {
            commit('setPassword', newValue)
            return state.password
        },
        setUsername: ({commit, state}, newValue) => {
            commit('setUsername', newValue)
            return state.username
        },
    }
});

new Vue({
    router, store,
    render: h => h(App)
}).$mount("#app");
