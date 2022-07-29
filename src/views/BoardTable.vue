<template>

<div>
    
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">  
            <div v-if="getBoardList">
                <h3 style="text-align:center;">게시판 페이지입니다!</h3>
                <b-card-group deck>
                    <b-card  :title="board.title" v-for="board in getBoardList" :key="board.id">
                        <router-link :to="{name:'detail', params:{id:board.id}}" tag="button" class="detailBoard">글보기</router-link>
                        <!-- <b-button @click="showWriting" variant="outline-success">글보기</b-button> -->
                    </b-card>  
                </b-card-group>
                <div style="text-align:right">
                    <b-button variant="outline-primary" @click="decrease" v-if="getPre">이전 글</b-button>
                    <b-button variant="outline-primary" @click="increase" v-if="getNext">다음 글</b-button>
                </div>
                       
            </div>
            <div v-else >
                <h3 style="text-align:center;" >등록된 게시물이 없습니다.</h3> 
            </div>
            <router-link v-if="LoginState" to="/create" tag="button" class="createBoard">글작성</router-link>
            
    </b-container>
    
    
</div>

</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

/* eslint-disable */


export default {
name:"BoardTable",
computed:{
    ...mapGetters(['getBoardList','getNext','getPre']), 
   LoginState(){
    return this.$store.getters.getLoginState;
   }
},
mounted(){
const store =this.$store;
store.state.visiablePre=false;
store.state.maxPage=3;

axios.post("api/auth/getBoard",{

}).then(function(res){
    store.commit('commitBoardList',res.data);

}).catch(function(err){
    console.log(err);
})
},


methods:{
    increase:function(){
        return this.$store.commit('increase');
    },
    decrease:function(){
      
      return this.$store.commit('decrease');
    },
    increase:function(){
        return this.$store.commit('increase');
    },
    showWriting:function(){
        
        this.$router.push({name:'detail',params:{id:1}});
        
        // this.$router.push({path:'/detail'});
    }
},



 
}
</script>
<style scoped>
.createBoard{
    width: 80px;
    height: 30px;
    background: rgb(16, 200, 224);
    color: white;
    border: none;
    
    border-radius: 5px;
}
.detailBoard{
    width: 80px;
    height: 30px;
    background: rgb(224, 16, 16);
    color: white;
    border: none;
    
    border-radius: 5px;
}
</style>