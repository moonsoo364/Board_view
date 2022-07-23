<template>

<div>
    
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
        <h3 style="text-align:center;">게시판 페이지입니다!</h3>
        <b-card-group deck >
            <b-card title="게시글" header-tag="header" footer-tag="footer">
                 <router-link to="/detail" tag="button" class="detailBoard">글보기</router-link>
            </b-card>
        </b-card-group>
      <router-link to="/create" tag="button" class="createBoard">글작성</router-link>

    </b-container>
    
    
</div>

</template>
<script>
/* eslint-disable */


export default {
name:"BoardTable"  
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