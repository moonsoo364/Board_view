<template>

<div>
    
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">  
            <div v-if="getBoardList">
                <h3 style="text-align:center;">{{getMaxPage/3}}/{{lastPage}} 페이지입니다!</h3>
                <b-card-group deck>
                   
                    <b-card  :title="board.title" v-for="board in getBoardList" :key="board.id">
                        <router-link :to="{name:'detail', params:{id:board.id}}" tag="button" class="detailBoard">글보기</router-link>
                        <!-- <b-button @click="showWriting" variant="outline-success">글보기</b-button> -->
                    </b-card>  
                </b-card-group>
                <div style="text-align:right">
                    <button @click="goFirstPage" class="btn btn-outline-success">처음으로</button>
                    <button class="btn btn-outline-primary" @click="decrease" v-if="getPre">이전 글</button>
                    <button class="btn btn-outline-primary" @click="increase" v-if="getNext">다음 글</button>
                </div>
                       
            </div>
            <div v-else >
                <h3 style="text-align:center;" >등록된 게시물이 없습니다.</h3> 
            </div>
            <router-link v-if="getLoginState" to="/create" tag="button" class="createBoard">글작성</router-link>
            
    </b-container>
    
    
</div>

</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

/* eslint-disable */


export default {
name:"BoardTable",
computed:{
    ...mapGetters(['getBoardList','getNext','getPre','getLoginState','getMaxPage']), 
    lastPage:function(){
        return (JSON.parse(localStorage.getItem('board')).length/3)+1;
    }
},
mounted(){
    this.$store.dispatch('selectBoard');
},
methods:{
    ...mapMutations(['increase','decrease','goFirstPage'])
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