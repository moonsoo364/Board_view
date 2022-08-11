<template>
  <div>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
      <h3 style="text-align:center;">{{getBoardData.id}}번째 글: {{getBoardData.title}}</h3>
      
      <div v-if="getBoardData.correctUser">
            <router-link :to="{name:'update', params:{id : getBoardData.id}}" tag="button" class="btn btn-outline-success">수정</router-link> 
            <button class="btn btn-outline-danger" @click="deleteData">삭제</button>
            <router-link to="/" tag="button" class="btn btn-outline-primary">목록</router-link>
      </div>
      <div v-else-if="!getBoardData.correctUser" >
         <router-link to="/" tag="button" class="btn btn-outline-primary">목록</router-link>
      </div>
      <div>작성자 : {{getBoardData.username}}<hr/> </div>
       
      <div> {{getBoardData.content}} </div>

    <div>
        
    </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

    export default {
      
      async created(){
        if(localStorage.getItem('user') == null){
          alert("접근권한 없음")
        }else{
            await this.$store.dispatch("selectDetail",this.$route.params.id)
        }
      },
      computed:{
        ...mapGetters(['getBoardData','getLoginState']),
    
      },

      methods:{
       deleteData(){
          const router = this.$router;
          const boardData =this.getBoardData;
          if(!boardData.correctUser){
               alert('작성자와 일치하지 않습니다!')
               router.push("/");
         }else{
          if(confirm('정말 게시글을 삭제하시겠습니까?'))
            this.$store.commit("deleteBoard");
         }
         
      },
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
.table{
    width: 80px;
    height: 30px;
    background: rgba(7, 60, 231, 0.582);
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