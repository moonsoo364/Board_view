<template>
  <div>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
      <h3 style="text-align:center;">{{getBoardData.id}}번째 글: {{getBoardData.title}}</h3>
      <div v-if="getBoardData.correctUser">
            <router-link :to="{name:'update', params:{id : getBoardData.id}}" tag="button" class="createCommit">글수정</router-link> 
            <button class="delete" @click="deleteData">삭제</button>
            <router-link to="/" tag="button" class="table">목록</router-link>
      </div>
      <div v-else>
         <router-link to="/" tag="button" class="table">목록</router-link>
      </div>
      <div>작성자 : {{getBoardData.username}}<hr/> </div>
       
      <div> {{getBoardData.content}} </div>
       
         
     

    <div>
        
    </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

    export default {
      
      mounted(){
       const store =this.$store;
       const param=this.$route.params.id;
       let ls=JSON.parse(localStorage.getItem('board')).length;
       let boardLength=store.state.detailBoardList.length;
       console.log("BoardData : "+store.state.BoardData);
        if(localStorage.getItem('user') ==null){
          alert("접근권한 없음")
        } else if((store.state.detailBoardList.length==0)||(boardLength<ls)||(store.state.isUpdateBoard)||(store.state.isDeleteBoard)){ 
            //경우1 : 처음 상세보기 클릭했을 때 경우2: 글이 등록되서 새로운글 표시할떄 경우3 글이 업데이트 되었을때 경우4 삭제되었을 때
            const token=JSON.parse(localStorage.getItem('user')).token
            const instance =axios.create({
              headers:{Authorization:token}
            })

          instance.post('/api/auth/selectAll',{})
          .then((res)=>{
            console.log(res);
            store.commit('selectBoardList',res.data);
            // 8/2 id값으로 게시물 찾고 넣기
            store.commit('getDetailBoard',param);
            store.state.isUpdateBoard=false;
            store.state.isDeleteBoard=false;
            console.log("done : "+store.state.isUpdateBoard);
          }).catch((err)=>{
            console.log(err);
          })
        }
        else{
          store.commit('setDetailBoard',param);
        } 
      },
        computed:{
          ...mapGetters(['getBoardData','getLoginState']),
     
        },
 
        methods:{
         deleteData(){
            const router = this.$router;
            const token =JSON.parse(localStorage.getItem('user')).token
            const boardData =this.getBoardData;
            const store =this.$store;
            console.log(boardData);
            const instance =axios.create({
                headers:{Authorization:token}
            })
            if(!boardData.correctUser){
                 alert('작성자와 일치하지 않습니다!')
                 router.push("/");
           }else{
            if(confirm('정말 게시글을 삭제하시겠습니까?')){
            instance.post('/api/auth/deleteBoard',{
                id:boardData.id
            }).then(function(res){
                console.log(res);
                store.state.isDeleteBoard=true;
                router.push('/');
                alert("게시글이 삭제되었습니다!");
            }).catch((e)=>{
                console.log(e);
                alert("게시물 삭제 불가!")
            })
            }
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