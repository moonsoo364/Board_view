
<template>
<div>
<b-container style="margin-top:2rem; margin-bottom:2rem; " fluid="md">
    <b-form>
      <h3 style="text-align:center;">유저이름 : {{paramName}}</h3>
       <button @click="behind" class="btn btn-outline-primary">뒤로</button>
       <button @click.prevent="existedPassword" :class="[getIsExistedPw ? 'btn btn-outline-success':'btn btn-outline-danger']">비밀번호 중복확인</button>
       <button @click.prevent="inversePw" v-if="getIsExistedPw" class="btn btn-outline-warning">비밀번호 변경</button>   
      <b-form  @submit.stop.prevent>
      <label for="feedback-user">비밀번호</label>
      <b-form-input :disabled="getIsExistedPw" type="password" v-model="password_data" :state="checkUserPw" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="checkUserPw">
        비밀번호는 6자 이상 12자 이하로 작성해주세요.(영어,숫자만가능)
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="checkUserPw">
        유효한 비밀번호 입니다.
      </b-form-valid-feedback>
     </b-form>
      <b-form  @submit.stop.prevent>
      <label for="feedback-user">비밀번호 확인</label>
      <b-form-input type="password" v-model="password_check" :state="reCheckPW" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="reCheckPW">
        비밀번호가 일치하지 않습니다.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="reCheckPW">
        비밀번호가 일치합니다.
      </b-form-valid-feedback>
     </b-form>

      <b-form  @submit.stop.prevent>
      <label for="feedback-user">이메일</label>
      <b-form-input v-model="email_data" :state="checkUserEm" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="checkUserEm">
        email@exmaple.com 양식으로 작성해주세요.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="checkUserEm">
        유효한 이메일 입니다.
      </b-form-valid-feedback>
     </b-form>
      
   
   
    
    </b-form>
     <b-button @click.prevent="updateUser" variant="primary">Submit</b-button>
</b-container>

</div>
</template>

<script>

import { mapGetters } from 'vuex';
  export default {

    data() {
      return {
        password_data:"",
        password_check:"",
        email_data:"",
        param:this.$route.params.id,
        paramName:this.$route.params.name,

      }
    },
    computed:{
      ...mapGetters(['getIsExistedPw']),

      checkUserPw(){
        
        if(this.password_data !== undefined){
          const reg =/^[a-zA-Z]+[a-zA-Z0-9]{5,30}$/;
          if (this.password_data.match(reg)){
            return true;
          }
        }
        return false
      },
      checkUserEm(){
        //eslint-disable-next-line no-useless-escape
      const reg=/^([A-z1-9]){6,12}@([A-z]){3,8}(\.){1}([A-z]){2,3}(\.)?((5)?[A-z]{1,3}|\b)$/;
       if(this.email_data.match(reg)){
        return true;
       }
        return false 
      },
      reCheckPW(){
       if(this.password_data === this.password_check){
        return true
       }
        return false 
      }
    },
    methods:{
      
    updateUser: function(){

      if(!this.getIsExistedPw){
          alert("비밀번호 중복확인을 해주세요!");
      }else if(this.checkUserPw&&this.checkUserEm&&this.reCheckPW){
        this.$store.commit("updateUser",{
            password:this.password_data,
            email:this.email_data,
            id:this.param
        });    
      }else{
          alert("유효한 정보를 입력하세요!")
      }
    },
    existedPassword:function(){
        if(this.checkUserPw){
          this.$store.commit('existedPassword',{
            password:this.password_data,
            id:this.param,
          });
        }else{
          alert("비밀번호을 제대로 입력하세요!");
        }
    },
    inversePw:function(){
      this.$store.commit('togleExitedPw')
    },  
    behind:function() {
        this.$router.push("/userinfo");
    }
    

  }
  }
  
</script>
<style scoped>

</style>