<template>
  <div>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
        <h3 style="text-align:center;">게시글 수정 페이지 입니다.</h3>
        <div>작성자 <input type="text" v-model="getUserData.username" disabled></div>
        <div>글번호 <input type="text" v-model="getBoardData.id" disabled></div>
    <b-input-group prepend="제목" class="mt-3">
        <b-form-input v-model="getBoardData.title"> </b-form-input>
    </b-input-group>
         <b-form-textarea
      id="textarea"
      v-model="getBoardData.content"
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
import { mapGetters } from 'vuex'


    export default {


        computed:{
         ...mapGetters([
        'getBoardData','getUserData'
        ])

        },
        mounted(){
            this.$store.dispatch('selectDetail',this.$route.params.id);
        },
        methods:{
           UpdateData(){
           
            if((this.title_data=='')){
                 alert('제목이 비었습니다!')
               
            }else if(this.content_data==''){
                alert('게시글 내용이 없습니다!')
            }else{
                this.$store.commit("updateBoard")
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