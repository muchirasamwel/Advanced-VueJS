<template>
    <div class="about">
        <h1>Login</h1>
        <form>
            <div>
                <label> Username</label><br>
                <input type="text" v-model="username">
            </div>
            <div>
                <label> Password</label><br>
                <input type="password" v-model="password">
            </div>
        </form>
        <div>
            <button @click="login()">Login</button>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            login: async function () {
                let results = await this.$store.dispatch('logon', {
                    username: this.$store.state.username
                    , password: this.$store.state.password
                });
                console.log(results);
                if (results.data.indexOf('error')<0) {
                   await this.$store.commit('setApi', results.data);
                    await alert("Login Success \n Your API Key = "+this.$store.state.apiKey);
                    this.$router.push('/');
                } else {
                    await this.$store.commit('setApi',"");
                    alert("API AUTH REJECTED")
                }
            }
        },
        computed: {
            password: {
                get() {
                    let pass = this.$store.state.password;
                    // console.log('getting '+pass)
                    return pass;
                },
                set(password) {
                    let pass = this.$store.dispatch('setPassword', password);
                    // console.log('setting '+pass)
                    return pass;
                }
            },
            username: {
                get() {
                    return this.$store.state.username
                },
                set(username) {
                    return this.$store.dispatch('setUsername', username)
                }
            }
        },
    }
</script>