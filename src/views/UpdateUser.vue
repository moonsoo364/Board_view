
<template>
<div>
<b-container style="margin-top:2rem; margin-bottom:2rem; " fluid="md">
    <b-form>
      <h3 style="text-align:center;">유저이름 : {{paramName}}</h3>
       <button @click="behind" class="btn btn-outline-primary">뒤로</button>
       <button @click.prevent="existedPassword" :class="[existedPw ? 'btn btn-outline-success':'btn btn-outline-danger']">비밀번호 중복확인</button>
       <button @click.prevent="inverseChkPw" v-if="existedPw" class="btn btn-outline-warning">비밀번호 변경</button>   
      <b-form  @submit.stop.prevent>
      <label for="feedback-user">비밀번호</label>
      <b-form-input :disabled="existedPw" type="password" v-model="password_data" :state="checkUserPw" id="feedback-user"></b-form-input>
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
     <b-button @click.prevent="fetchData" variant="primary">Submit</b-button>
</b-container>

</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import { mapGetters } from 'vuex';
const token= localStorage.getItem('user')!=null ? JSON.parse(localStorage.getItem('user')).token : null;
const instance =axios.create({
    headers:{Authorization:token}
})
  export default {
    mounted(){
        const param=this.$route.params.id;
    },  
    data() {
      return {
        password_data:"",
        password_check:"",
        email_data:"",
        existedPw:false,
        param:this.$route.params.id,
        paramName:this.$route.params.name,

      }
    },
    computed:{
      ...mapGetters(['']),

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
      
    fetchData: function(){
      const router=this.$router;
        if(!this.existedPw){
            alert("비밀번호 중복확인을 해주세요!");
        }else if(this.checkUserPw&&this.checkUserEm&&this.reCheckPW){
          instance.post('/api/admin/userUpdate',{
            password:this.password_data,
            email:this.email_data,
            id:this.param
          }).then(function(res){  
          alert("회원 정보 수정완료!")
            router.push("/userinfo");
         }).catch((e)=>{
              console.log(e);
              alert("회원가입 실패 !")

         })
      }else{
          alert("유효한 정보를 입력하세요!")
      }
    },
    existedPassword:function(msg,event){
        if(this.checkUserPw){
            instance.post('/api/admin/existedPassword',{password:this.password_data,id:this.param})
            .then((res)=>{
                console.log(res.data);
                if(res.data){
                  alert("이미 사용하고 있는 비밀번호입니다.");
                }else{
                  alert("사용가능한 비밀번호입니다.");
                  this.existedPw=true;
                }
                
            }).catch(function(err){
                alert("JWT이 제대로인식이 안됩니다!")
                this.existedPw=false;
                console.log(err);
            })
           
        }else{
            alert("비밀번호을 제대로 입력하세요!");
        }
    },
    inverseChkPw:function(){
      this.existedPw= !this.existedPw;
    },  
    behind:function() {
        this.$router.push("/userinfo");
    }
    

  }
  }
  
</script>
<style scoped>

</style>