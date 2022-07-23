
<template>
<div>
<b-container style="margin-top:2rem; margin-bottom:2rem; " fluid="md">
    <b-form>
      <h3 style="text-align:center;">회원가입 페이지입니다!</h3>

      <b-form  @submit.stop.prevent>
      <label for="feedback-user">User ID</label>
       <b-button style="margin:0 0 5px 20px;" @click="checkName" variant="warning">중복확인</b-button>
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
      <b-form-input type="password" v-model="password_data" :state="checkUserPw" id="feedback-user"></b-form-input>
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
     <b-button @click="fetchData" variant="primary">Submit</b-button>
</b-container>

</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
  export default {
    data() {
      return {
        username_data:"",
        password_data:"",
        password_check:"",
        email_data:"",

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
      },
      checkUserEm(){
        //eslint-disable-next-line no-useless-escape
        // .이 무조건 와야하며 .co .com .kr 2~3글자 제한
       const reg =/^[a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
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
      //200일 때만 then을 실행
      
      fetchData: function(){
        const router=this.$router;
      if(this.checkUserId&&this.checkUserPw&&this.checkUserEm&&this.reCheckPW){
        axios.post('/api/auth/joinProc',{
          username:this.username_data,
          password:this.password_data,
          email:this.email_data,
          
        }).then(function(res){

          alert("회원가입 성공 !")
          //익명함수 내에서 this가 객체를 가르키지 않음.
          console.log("function : "+this)
          router.push('/')

          }).catch((e)=>{
             console.log(e);
             alert("회원가입 실패 !")
   
          })
      }else{
        alert("유효한 회원 정보를 입력하십시오!")
      }
    },
    checkName: function(){
      if(this.checkUserId){
        axios.post('api/auth/checkName',{
          username:this.username_data
        }).then(function(res){
          
           alert("사용가능한 아이디입니다.")
          console.log(res);
        }).catch((e)=>{
          console.log(e);
          alert("아이디가 중복 되었습니다.")
        })

      }else{
        alert("아이디를 먼저 입력하세요!")
      }

    }
  }
  }
  
</script>