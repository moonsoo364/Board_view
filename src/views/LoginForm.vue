
<template>
<div>
<NavBar/>
<b-container style="margin-top:2rem; margin-bottom:2rem; " fluid="md">
    <b-form>
      <h3 style="text-align:center;">로그인 페이지입니다!</h3>
      <b-form  @submit.stop.prevent>
      <label for="feedback-user">User ID</label>
      <b-form-input v-model="username_data" :state="checkUserId" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="checkUserId">
        사용자 ID는 6자 이상 12자 이하로 작성해주세요.(영어,숫자만가능)
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="checkUserId">
        유효한 ID 입니다.
      </b-form-valid-feedback>
     </b-form>

      <b-form  @submit.stop.prevent>
      <label for="feedback-user">비밀번호</label>
      <b-form-input v-model="password_data" :state="checkUserPw" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="checkUserPw">
        비밀번호는 6자 이상 12자 이하로 작성해주세요.(영어,숫자만가능)
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="checkUserPw">
        유효한 비밀번호 입니다.
      </b-form-valid-feedback>
     </b-form>

     <b-button @click="fetchData" variant="primary">Submit</b-button>
    </b-form>
</b-container>
<Footer/>
</div>
</template>

<script>
import axios from 'axios'
/* eslint-disable */
  export default {
    data() {
      return {
        username_data:"",
        password_data:""
      }
    },
    computed:{
       checkUserId(){

        if(this.username_data !== undefined){
          const reg =/^[a-zA-Z]+[a-zA-Z0-9]{5,30}$/;
          if (this.username_data.match(reg)){
            return true;
          }
        }
        return false
      },
      checkUserPw(){

        if(this.password_data !== undefined){
          const reg =/^[a-zA-Z]+[a-zA-Z0-9]{5,30}$/;
          if (this.password_data.match(reg)){
            return true;
          }
        }
        return false
      }

    },
    
    methods: {
     fetchData: function(){
        if(this.checkUserId&&this.checkUserPw){
          axios.post('api/auth/login',{
            username:this.username_data,
            password:this.password_data
          }).then((res)=>{
            console.log(res);
            alert("로그인 성공!");
            
          })
        }else{
          alert("로그인 실패!")
            console.log(e);
        }

      }
      },
      
    }
  
</script>

<style scoped>
   
</style>