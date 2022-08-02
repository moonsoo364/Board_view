<template>
  <div>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
        <h3 style="text-align:center;">게시글 수정 페이지 입니다.</h3>
        <div>작성자 <input type="text" v-model="getUsername" disabled></div>
        <div>글번호 <input type="text" v-model="getBoardData.id" disabled></div>
    <b-input-group prepend="제목" class="mt-3">
        <b-form-input v-model="title_data"> </b-form-input>
    </b-input-group>
         <b-form-textarea
      id="textarea"
      v-model="content_data"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <div>
        <button class="createCommit" @click="UpdateData">글등록</button>
        <router-link :to="{name:'detail', params:{id:getBoardData.id}}" tag="button" class="list">목록</router-link>
    </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'


    export default {


        computed:{
         ...mapGetters([
        'getBoardData','getUsername'
        ]), 
       
        },
         data(){
            return{
                title_data:"",
                content_data:"",

            }
        },
        methods:{
           UpdateData(){
            const router = this.$router;
            const store =this.$store;
            const token =JSON.parse(localStorage.getItem('user')).token
            const boardData =this.getBoardData
            const instance =axios.create({
                headers:{Authorization:token}
            })
            if((this.title_data=='')){
                 alert('제목이 비었습니다!')
               
            }else if(this.content_data==''){
                alert('게시글 내용이 없습니다!')
            }else{
                instance.post('/api/auth/updateBoard',{
                    content: this.content_data,
                    title: this.title_data,
                    id:boardData.id
                }).then(function(res){
                    console.log(res);
                    router.push("/");
                    store.state.isUpdateBoard =true;
                    alert("게시글이 수정되었습니다!");

                    router.push("/");
                }).catch((e)=>{
                    console.log(e);
                    alert("게시물 수정 불가!")
                })
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
.list{
    width: 80px;
    height: 30px;
    background: rgba(255, 39, 1, 0.658);
    color: white;
    border: none;
    
    border-radius: 5px;
}
</style>