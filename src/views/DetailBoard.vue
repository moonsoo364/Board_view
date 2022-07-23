<template>
  <div>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
        <h3 style="text-align:center;">상세보기 페이지입니다!</h3>
        <router-link to="/" tag="button" class="createCommit">글수정</router-link>
        
        <router-link to="/" tag="button" class="list">삭제</router-link>
        
        <div><label>작성자 : </label> moonsoo</div>
        <hr/>
       <div>
        게시글 작성
       </div>

    <pre class="mt-3 mb-0">{{ text }}</pre>
    <div>
        
    </div>
    </b-container>
  </div>
</template>

<script>
    export default {
        
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