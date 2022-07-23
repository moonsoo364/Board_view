<template>
  <div>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
        <h3 style="text-align:center;">게시글작성 페이지입니다!</h3>
        <div>작성자 <input type="text"></div>
         <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <pre class="mt-3 mb-0">{{ text }}</pre>
    <div>
        <router-link to="/" tag="button" class="createCommit">글등록</router-link>
        <router-link to="/" tag="button" class="list">목록</router-link>
    </div>
    </b-container>
  </div>
</template>

<script>
    export default {

        methods:{
            insertBoard: function(){
                alert("게시글 작성")
            }
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