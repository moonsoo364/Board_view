
<template>
<div>
<b-container style="margin-top:2rem; margin-bottom:2rem; " fluid="md">
    <b-form>
      <h3 style="text-align:center;">로그인 페이지입니다!</h3>
      <b-form  @submit.stop.prevent>
      <label >User ID</label>
      <b-form-input v-model="user.username" :state="checkUserId" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="checkUserId">
        사용자 ID는 6자 이상 12자 이하로 작성해주세요.(영어,숫자만가능)
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="checkUserId">
        유효한 ID 입니다.
      </b-form-valid-feedback>
     </b-form>

      <b-form  @submit.stop.prevent>
      <label >비밀번호</label>
      <b-form-input type="password" v-model="user.password" :state="checkUserPw" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="checkUserPw">
        비밀번호는 6자 이상 12자 이하로 작성해주세요.(영어,숫자만가능)
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="checkUserPw">
        유효한 비밀번호 입니다.
      </b-form-valid-feedback>
     </b-form>

     <b-button @click="loginUser" variant="primary">Submit</b-button>
    </b-form>
</b-container>
<Footer/>
</div>
</template>

<script>
  export default {
    data() {
      return {
        user:{username:'',password:''},
      }
    },
    computed:{
       checkUserId(){
        if(this.user.username !== undefined){
          const reg =/^[a-zA-Z]+[a-zA-Z0-9]{5,30}$/;
          if (this.user.username.match(reg)){
            return true;
          }
        }
        return false
      },
      checkUserPw(){
        if(this.user.password !== undefined){
          const reg =/^[a-zA-Z]+[a-zA-Z0-9]{5,30}$/;
          if (this.user.password.match(reg)){
            return true;
          }
        }
        return false
      },
    },
    methods: {
     loginUser: function(){
      if(this.checkUserId&&this.checkUserPw){
        this.$store.dispatch('loginUser',this.user);
      }else{
        alert("유효한 유저정보를 입력하세요!")
      }
     },
    },
      
    }
  
</script>

<style scoped>
   
</style>