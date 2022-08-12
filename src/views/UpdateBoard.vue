<template>
  <div>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
        <h3 style="text-align:center;">게시글 수정 페이지 입니다.</h3>
        <div>작성자 <input type="text" v-model="getUserData.username" disabled></div>
        <div>글번호 <input type="text" v-model="getBoardData.id" disabled></div>
        <b-input-group prepend="제목" class="mt-3">
            <b-form-input v-model="getBoardData.title"> </b-form-input>
        </b-input-group>
    
         <cv-form style="border: 1px solid #ced4da;padding: 1rem;">
        <div style="border: 1px solid #0f62fe; padding: 1rem;margin-bottom: 1rem;">
            이전 파일 목록 :
            <strong v-if="getBoardData.filename.length === 0">이전 파일이 없습니다.</strong>
            <span v-else style="margin: 1rem ;" v-for="file in getBoardData.filename" :key="file">
                <strong>{{file}}</strong>
            </span>
        </div>
       <h6 :class="[this.fileSize==0? 'unloaded':'downloaded']">현재 업로드된 파일 용량 : {{fileCapacity}}</h6>
      <cv-file-uploader
        label="파일용량은 10MB미만만 가능합니다."
        helperText="원하는 파일을 선택하고 업로드하세요"
        drop-target-label
        accept="image/*,audio/*,video/*,.txt"
        :clear-on-reselect="true"
        :initial-state-uploading="false"
        :multiple="true"
        :removable="true"
        v-model="deltaFile"
        ref="fileUploader"
      ></cv-file-uploader>
        <button v-if="!this.getUploadFileOK" class="btn btn-primary" @click.prevent="onclick" :disabled="this.deltaFile.length===0">파일업로드</button>
        <button v-else @click.prevent="setFileUploadFalse"  class="btn btn-outline-warning">다시 업로드하기</button>
    </cv-form>
        <vue-editor v-model="getBoardData.content"></vue-editor>
        <div>
            <button class="createCommit" @click="UpdateData">글등록</button>
            <router-link :to="{name:'detail', params:{id:getBoardData.id}}" tag="button" class="list">목록</router-link>
        </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { VueEditor } from 'vue2-editor';

    export default {

        data(){
            return{
                deltaFile:[],
                fileSize:0,
                fileCapacity:'0B',
            }
        },
        computed:{
         ...mapGetters([
         'getBoardData','getUserData','getUploadFileOK',
        ])

        },
        mounted(){

            this.$store.commit('setFileUploadFalse');
            this.$store.commit('selectByBoardId',this.$route.params.id);
        },
        methods:{
              ...mapMutations(['setFileUploadFalse']),
           UpdateData(){
           
            if((this.title_data=='')){
                 alert('제목이 비었습니다!')
               
            }else if(this.content_data==''){
                alert('게시글 내용이 없습니다!')
            }else if(!this.getUploadFileOK && this.deltaFile.length != 0){
                alert("업로드를 먼저 해주세요.")

            }else{
               let nameArr=[];
               this.deltaFile.forEach(element=>{
                nameArr.push(element.file.name);
               })
                this.$store.commit("updateBoard",nameArr);
            }
        },
        onclick(){
                this.fileSize=0;
                this.deltaFile.forEach(element=>{
                    this.fileSize += element.file.size;
                });
                console.log(this.fileSize);
                if(this.fileSize>10000000){
                    this.fileSize= parseInt(this.fileSize/1000000);
                    this.fileCapacity = this.fileSize+"MB";
                  
                }else if(this.fileSize>1000){
                    this.fileSize= parseInt(this.fileSize/1000);
                    this.fileCapacity = this.fileSize+"KB";
                }else{
                    this.fileSize= parseInt(this.fileSize);
                    this.fileCapacity = this.fileSize+"B";
                }
               const formData =new FormData();
               this.deltaFile.forEach(element=>{
                   formData.append('fileList',element.file);
               })
               this.$store.commit('submitFiles',formData);

        },    
    },
    components:{VueEditor},
    }
</script>

<style>
.unloaded{
    color:rgb(0, 35, 236);
}
.downloaded{
    color:rgb(8, 161, 59);
}
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