<template>
    <div style="width:80%;margin:auto;margin-bottom: 2rem;">
    <h4 style="text-align:center;margin:2rem 0 2rem 0">{{name}}의 작성글 목록</h4>
    <button @click="behind" class="btn btn-outline-primary">뒤로</button>
    <vue-good-table :columns="columns" :rows = "getWritingList" >
        <template slot="table-row" slot-scope="prop">
            <span v-if="prop.column.field ==='delete'">
                <button @click="deleteWriting({num:prop.row.id, user:id})" class="btn btn-outline-danger">글삭제</button>
            </span>
            <span v-else>{{prop.formattedRow[prop.column.field]}}</span>
        </template>
    </vue-good-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    


export default {
    name:"WritingUser",
    computed:{
        ...mapGetters(['getWritingList']),
    },
    mounted(){
       
        const router =this.$router
        const admin=JSON.parse(localStorage.getItem('user')).isAdmin;

        if(admin==false){
            alert("관리자 권한이 없습니다!");
            router.push("/");
        }else{
            this.$store.dispatch("selectUserWriting",this.id);
        }

    },
    data(){
        return{
            id:this.$route.params.id,
            name:this.$route.params.name,
            columns:[
                {
                    label: "Id",
                    field:"id",
                },
                {
                    label: "Title",
                    field:"title",
                },
                {
                    label: "Content",
                    field:"content",
                },
                {
                    label: "Date",
                    field:"date",
                },
                {
                    label: "Username",
                    field:"username",
                },
                {
                    label:"Delete",
                    field:"delete"
                }
            ],

       
        }
    },
    methods:{  
        
        behind:function() {
        this.$router.push("/userinfo");
        },
        deleteWriting:function(param){
            if(confirm("정말 "+param.num+"번 글을 삭제하시겠습니까?"))
           {
            this.$store.dispatch('deleteBoardById',param.num)
           }
            
        }
    }
}
</script>

<style>

</style>