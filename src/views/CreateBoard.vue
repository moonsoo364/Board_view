<template>
  <div>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
        <h3 style="text-align:center;">게시글작성 페이지입니다!</h3>
        <div>작성자 <input type="text" v-model="getUsername" disabled></div>
    <b-input-group prepend="제목" class="mt-3">
        <b-form-input v-model="title"> </b-form-input>
    </b-input-group>
         <b-form-textarea
      id="textarea"
      v-model="content"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <div>
        <button class="createCommit" @click="fetchData">글등록</button>
        <router-link to="/" tag="button" class="list">목록</router-link>
    </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'


    export default {
        data(){
            return{
                content:'',
                title:'',

            }
        },
         updated(){
            if(this.getUsername==''){
                alert("게시글 접근 불가!")
                this.$router.push('/')
            }
         },
        computed:{
            getUsername(){
            return this.$store.getters.getUsername;      
            },

            
        },
        methods:{
           fetchData(){
            const router = this.$router;
            const token =JSON.parse(localStorage.getItem('user')).token
            console.log(token);
            const instance =axios.create({
                headers:{Authorization:token}
            })
            if((this.title=='')){
                 alert('제목이 비었습니다!')
               
            }else if(this.content==''){
                alert('게시글 내용이 없습니다!')
            }else{
                instance.post('api/auth/insertBoard',{
                    content:this.content,
                    title:this.title,
                }).then(function(res){
                    console.log(res);
                    router.push('/');
                    alert("게시글이 등록되었습니다!");
                }).catch((e)=>{
                    console.log(e);
                })
            }
           
           
        }
        
    }
    }
</script>

<style scoped>

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