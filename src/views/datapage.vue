<template>
  <div class="datapage">
    <h1>Push data to API</h1>
    <form action="">
      <div>
        <label>id</label><br>
        <input type="number" v-model="fdata.id">
      </div>
      <div>
        <label>name</label><br>
        <input type="text" id="name" v-model="fdata.name">
      </div>
      <div>
        <label>account number</label><br>
        <input type="text" v-model="fdata.accno">
      </div>
      <div>
        <label>Department</label><br>
        <input type="text" v-model="fdata.dept">
      </div>
    </form>
    <div>
      <button v-on:click="pushdata()">ADD ACCOUNT</button>
      <p>Added {{count}}</p>
    </div>
  </div>
</template>
<style  lang="scss">
  form{
    padding: 20px;
    border: 2px solid black;
    justify-content: center;
    margin: auto;
    width: 80%;
    div{
      label{
        width: 10%;
      }
      padding: 10px;
      font-size: 1.2em;
      input{
        width: 80%;
        font-size: 1.2em;
      }
    }
  }
  button{
    background-color: whitesmoke;
    border: 2px solid black;
    border-radius: 4px;
    padding: 5px;
    font-weight: bold;
    margin: 3px;
    &:hover{
      background-color: #0800ff;
      color: white;
      cursor:pointer;
    }
  }
</style>
<script>
  import axios from 'axios';
  export default {
    data:function(){
      return{
        fdata:{},
        idname:'',
        id:'',
        name:''
      }
    },
    watch: {
      id : function (val) {
        this.idname = val + ' ' + this.name
      },
      name: function (val) {
        this.fullName = this.id + ' ' + val
      }
    },
    computed: {
      count () {
        return this.$store.state.count
      }
    },
    methods:{
      pushdata:function () {
        alert('Data pushhed');
        axios.post('http://127.0.0.1:8000/smb_api/accounts/add',
                {
                  id:this.fdata.id,
                  name:this.fdata.name,
                  accountno:this.fdata.accno,
                  department:this.fdata.dept
                }).then(result => {
          this.$store.commit('increment');
          console.log(result.data);
        });
      }
    }

  }
</script>
