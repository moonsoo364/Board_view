
<template>
<div>
<b-container style="margin-top:2rem; margin-bottom:2rem; " fluid="md">
    <b-form>
      <h3 style="text-align:center;">회원가입 페이지입니다!</h3>
      
      <b-form  @submit.stop.prevent>
      <label for="feedback-user">User ID</label>
      <button style="margin:0 0 0 1rem;" @click="checkName" :class="[getNoOverLapId ? 'btn btn-outline-success':'btn btn-outline-danger']">중복확인</button>
      <button v-if="getNoOverLapId" @click="inverseOverlap" class="btn btn-outline-warning">ID수정</button>
      <b-form-input  :disabled="getNoOverLapId" v-model="user.username" :state="checkUserId" id="feedback-user"></b-form-input>
      
      <b-form-invalid-feedback :state="checkUserId">
        사용자 ID는 6자 이상 12자 이하로 작성해주세요.(영어,숫자만가능)
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="checkUserId">
        유효한 ID 입니다.
      </b-form-valid-feedback>
     </b-form>

      <b-form  @submit.stop.prevent>
      <label for="feedback-user">비밀번호</label>
      <b-form-input type="password" v-model="user.password" :state="checkUserPw" id="feedback-user"></b-form-input>
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
      <b-form-input v-model="user.email" :state="checkUserEm" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="checkUserEm">
        email@exmaple.com 양식으로 작성해주세요.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="checkUserEm">
        유효한 이메일 입니다.
      </b-form-valid-feedback>
     </b-form>
      
    <b-form-select size="sm" v-model="user.role" :options="options"></b-form-select>   
    <div v-if="user.role" class="mb-3" style="font-size: 0.875em;">선택한 계정: <strong>{{ user.role }}</strong></div>
    <div v-else class="mb-3" style="font-size: 0.875em;"><span style="color:#dc3545;">계정을 선택 해주세요!</span></div>
    </b-form>
     <b-button @click="joinUser" variant="primary">Submit</b-button>
</b-container>

</div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        password_check:"",
        user:{username:'',password:'',email:'',role:''},
        options: [
          { value: 'ADMIN', text: 'Admin' },
          { value: 'USER', text: 'User' },

        ]

      }
    },
    computed:{
      ...mapGetters(['getNoOverLapId']),
      checkUserId(){

        if(this.user.username !== undefined){
          const reg =/^[a-zA-Z]+[a-zA-Z0-9]{5,12}$/;
          if (this.user.username.match(reg)){
            return true;
          }
        }
        return false
      },
      checkUserPw(){

        if(this.user.password !== undefined){
          const reg =/^[a-zA-Z]+[a-zA-Z0-9]{5,12}$/;
          if (this.user.password.match(reg)){
            return true;
          }
        }
        return false
      },
      checkUserEm(){
       const reg=/^([A-z1-9]){6,12}@([A-z]){3,8}(\.){1}([A-z]){2,3}(\.)?((5)?[A-z]{1,3}|\b)$/;

       if(this.user.email.match(reg)){
        return true;
       }
        return false 
      },
      reCheckPW(){
       if(this.user.password === this.password_check){
        return true
       }
        return false 
      }
    },
    methods:{    
      joinUser: function(){
      if(!this.getNoOverLapId){
        alert('중복 확인을 해주세요!')
      }else if(this.user.role&&this.checkUserId&&this.checkUserPw&&this.checkUserEm&&this.reCheckPW){
        this.$store.dispatch('userJoin',this.user);
      }else{
        alert("유효한 정보를 입력하세요!")
      }
    },
    checkName: function(){
      this.$store.commit('overlapCheckId',this.user.username);
    },
    inverseOverlap:function(){
      this.$store.commit("inverseOverlapId")
    }
  }
  }
</script>
<style scoped>

</style>