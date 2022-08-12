<template>
  <div v-if="getLoadBoardOK">
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
    
      <h3 style="text-align:center;">{{getBoardData.id}}번째 글: {{getBoardData.title}}</h3>
      <div v-if="getUserData.isAdmin">
          <button class="btn btn-outline-warning" @click="prePage">이전으로</button>
          <router-link :to="{name:'update', params:{id : getBoardData.id}}" tag="button" class="btn btn-outline-success">수정</router-link> 
          <button class="btn btn-outline-danger" @click="deleteData">삭제</button>
          <router-link to="/" tag="button" class="btn btn-outline-primary">목록</router-link>
      </div>
      <div v-else-if="getBoardData.correctUser">
            <router-link :to="{name:'update', params:{id : getBoardData.id}}" tag="button" class="btn btn-outline-success">수정</router-link> 
            <button class="btn btn-outline-danger" @click="deleteData">삭제</button>
            <router-link to="/" tag="button" class="btn btn-outline-primary">목록</router-link>
      </div>
      <div v-else-if="!getBoardData.correctUser" >
         <router-link to="/" tag="button" class="btn btn-outline-primary">목록</router-link>
      </div>
      
      <div style=" padding: 1rem;"><span >작성자 : {{getBoardData.username}}</span> </div>
      <div style="border: 1px solid #0f62fe; padding: 1rem;margin-bottom: 1rem;">
        파일 목록 :
        <strong v-if="getBoardData.filename.length === 0">등록한 파일이 없습니다.</strong>
        <span v-else  v-for="file in getBoardData.filename" :key="file">
            <strong class="file_list" @click="downloadFile(file)">{{file}}</strong>
      
        </span>
        
      </div>
      <div class="ql-editor" v-html="getBoardData.content"/> 
     
    </b-container>
  </div>
   <div class="loading_display" v-else>

    <div>
       <b-col md="6" class="mb-3">
        <b-icon icon="arrow-clockwise" animation="spin" font-scale="10"></b-icon>
      </b-col>
    </div>
   
       
  </div>
</template>

<script>
import router from '@/router';
import { mapGetters} from 'vuex';
import { VueEditor } from 'vue2-editor';

    export default {
      
       created(){
        if(localStorage.getItem('user') == null){
          alert("접근권한 없음")
          this.$router.push("/");
        }else{
            this.$store.dispatch("loadBoard",this.$route.params.id);
        }
      },
      computed:{
        ...mapGetters(['getBoardData','getLoginState','getUserData','getLoadBoardOK']),
    
      },

      methods:{
       deleteData(){
          const router = this.$router;
          if(this.getUserData.isAdmin){
            if(confirm('Admin권한 : 정말 게시글을 삭제하시겠습니까?'))
            this.$store.commit("deleteBoard");
               
         }else if(this.getUserData.correctUser){
          if(confirm('정말 게시글을 삭제하시겠습니까?'))
            this.$store.commit("deleteBoard");
         }else{
          alert("게시물 삭제 권한이 없습니다.")
          router.push("/");
         }
         
      },
      prePage(){
        router.back(-1);
      },
      downloadFile(file){
        this.$store.commit('downloadFile',file);
      },
      },
      comments:{VueEditor}
    }
    
</script>

<style>
@import '@/assets/vue2-editor.css';
.loading_display{
  margin: 0;
  width:100%;
  height:70vh;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.file_list {
  font-weight: bold;
  text-decoration: none;
  margin: 1rem ;
  cursor: pointer;
}
.file_list:hover{
  color: crimson;
}

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