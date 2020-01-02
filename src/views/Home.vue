<template>
    <div class="home">
        <img id="mylogo" alt="Vue logo" src="../assets/smb.webp" width="300px"/>
        <div class="container">
            <div class="mcard" v-for="account in accounts" :key="account.id">
                <div class="chead"><span>{{account.id}}</span>{{account.department}}</div>
                <div>
                    <p>{{account.accountno}}</p>
                    <p>{{account.name}}</p>
                </div>
            </div>
        </div>
<!--        <ul v-if="errors && errors.length">-->
<!--            <li v-for="error in errors" :key="error">-->
<!--                {{error.message}}-->
<!--            </li>-->
<!--        </ul>-->
    </div>
</template>
<style lang="scss">
    @mixin resp_card {
        @media all and (min-width: 480px) {
            width: 33%;
        }
    }

    .container {
        width: 100%;
    }

    .mcard {
        display: inline-block;
        margin: 10px;
        border: 2px solid black;
        width: 100%;
        @include resp_card;

        .chead {
            background-color: gray;
            color: white;
            font-weight: bolder;
        }
    }

    #mylogo {
        //position: absolute;
        animation: anim1;
        animation-duration: 300ms;
        animation-timing-function: linear;
    }

    @keyframes anim1 {
        0% {
            //transform: rotateY(0deg);
            width: 0px
        }
        20% {
           // transform: rotateY(72deg);
            width: 60px
        }
        40% {
            //transform: rotateY(144deg);
            width: 120px
        }
        60% {
           // transform: rotateY(216deg);
            width: 180px
        }
        80% {
            //transform: rotateY(288deg);
            width: 240px
        }
        100% {
            //transform: rotateY(360deg);
            width: 300px
        }
    }
</style>
<script>
    import axios from 'axios';
    import vuex from 'vuex';
    export default {
        name: "home",
        components: {},
        acc:[],
        data() {
            return {

            }
        },
        created() {
            this.$store.dispatch('fetchData');
        },
        computed: {
            accounts: {
                get() {
                    let acc = this.$store.state.accounts;
                    // console.log('getting '+pass)
                    return acc;
                }

            }
        }
    };
</script>
