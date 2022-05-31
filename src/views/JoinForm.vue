<template>
<div>
<NavBar/>
<b-container style="margin-top:2rem; margin-bottom:2rem; " fluid="md">
    <b-form>
      
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          placeholder="Enter Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          placeholder="Enter Password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="email"
          placeholder="Enter Email"
          required
        ></b-form-input>
      </b-form-group>


      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</b-container>
<Footer/>
</div>
</template>

<script>
import Footer from "../components/layout/FooterBar.vue"
import NavBar from "../components/layout/NavBar.vue"
  export default {
    data() {
      return {

      }
    },
    methods: {
    
      },
    components:{
        Footer,
        NavBar
    }
    }
  
</script>

<style scoped>
   
</style>