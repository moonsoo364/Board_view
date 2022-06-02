
<template>
<div>
<NavBar/>
<b-container style="margin-top:2rem; margin-bottom:2rem; " fluid="md">
    <b-form>
      
      <b-form-group id="input-group-1" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-1"
          placeholder="Enter Name"
          v-model="username_data"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          placeholder="Enter Password"
          v-model="password_data"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-3"
          type="email"
          placeholder="Enter Email"
          v-model="email_data"
          required
        ></b-form-input>
      </b-form-group>
    
    </b-form>
     <b-button @click="fetchData" variant="primary">Submit</b-button>
</b-container>
<Footer/>

</div>
</template>

<script>
/* eslint-disable */
import Footer from "../components/layout/FooterBar.vue"
import NavBar from "../components/layout/NavBar.vue"
import ThisMethod from "../components/ThisMethod.vue"
import axios from 'axios'
  export default {
    data() {
      return {
        username_data:"",
        password_data:"",
        email_data:""

      }
    },
    methods:{
      fetchData: function(){
        axios.post('/api/auth/joinProc',{
          username:this.username_data,
          password:this.password_data,
          email:this.email_data
        }).then((res)=>{
          console.log(res);
        }).catch((e)=>{
          console.log(e);
        })

      }
    },
    components:{
        Footer,
        NavBar,
    }
    }
  
</script>