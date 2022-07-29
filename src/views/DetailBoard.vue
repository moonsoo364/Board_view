<template>
  <div>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
        <h3 style="text-align:center;">상세보기 페이지입니다!</h3>
        <div v-if="compareUser">
              <router-link to="/" tag="button" class="createCommit">글수정</router-link> 
              <router-link to="/" tag="button" class="delete">삭제</router-link>
              <router-link to="/" tag="button" class="list">목록</router-link>
        </div>
        <div v-else>
           <router-link to="/" tag="button" class="list">목록</router-link>
        </div>
       

        <div>작성자 :{{getBoardUser}}</div>
        <hr/>
       <div>
         게시글 내용
       </div>
       

    <pre class="mt-3 mb-0">{{ text }}</pre>
    <div>
        
    </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

    export default {
      
      mounted(){
        
        const number = this.$route.params.id;
        console.log(number);
        axios.post('api/auth/selectWriting',{
          num:number
        }).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        })
      },
        computed:{
          getBoardUser(){
            return this.$store.getters.getBoarduser;
          },
          compareUser(){
            return this.$store.getters.compareUser;
          }
        }
    }
</script>

<style>
.createCommit{
    width: 80px;
    height: 30px;
    background: rgb(6, 255, 160);
    color: white;
    border: none;
    
    border-radius: 5px;
}
.list{
    width: 80px;
    height: 30px;
    background: rgba(1, 60, 255, 0.582);
    color: white;
    border: none;
    
    border-radius: 5px;
}
.delete{
    width: 80px;
    height: 30px;
    background: rgba(255, 39, 1, 0.658);
    color: white;
    border: none;
    
    border-radius: 5px;
}
</style>