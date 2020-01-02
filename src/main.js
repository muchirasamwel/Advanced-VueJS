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
        password: "",
        apiKey:"",
        accounts:[]
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--,
        setPassword: (state, newValue) => {
            state.password = newValue
        },
        setApi: (state, newValue) => {
            state.apiKey = newValue
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
        fetchData({commit,state}){
            axios.get(`http://127.0.0.1:8000/smb_api/accounts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': state.apiKey},
                })
                .then(response => {
                    let resp = response.data;
                    console.log(resp);
                    if (resp === "Failed to authenticate token."||resp === 'No token Provided') {
                        state.accounts = [];
                    } else {
                        //console.log('auth success');
                        state.accounts = resp;
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        },
        pushData({commit,state},data){
            alert('Data pushed');
            console.log( state.apiKey);
            axios.post('http://127.0.0.1:8000/smb_api/accounts/add',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': state.apiKey
                    }
                }
            ).then(result => {
                commit('increment');
                console.log(result.data);
            });
        },
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
