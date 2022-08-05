<template>
  <div>
     <h3 style="text-align:center;margin: 1rem 0 1rem 0;">관리자 페이지 입니다.</h3>
    <vue-good-table :columns="columns" :rows="getUserList" style="width:80%;margin:auto;margin-bottom:3rem ;">
      <template slot="table-row" slot-scope="prop">
        <span v-if="prop.column.field === 'update'">
           <router-link :to="{name:'updateUser', params:{id:prop.row.id, name:prop.row.username}}" tag="button" class="btn btn-outline-success">정보수정</router-link>
        </span>
        <span v-if="prop.column.field === 'writing'">
           <router-link :to="{name:'writingUser', params:{id:prop.row.id, name:prop.row.username}}" tag="button" class="btn btn-outline-warning">글목록</router-link>
        </span>
           
        <span v-else> {{ prop.formattedRow[prop.column.field] }} </span>
      </template>
    </vue-good-table>
  </div>
    

</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
  
export default {
  name: "UserInfo",
  computed:{
   ...mapGetters(['getUserList']),

  },
  mounted(){
    const store= this.$store;
    const token =JSON.parse(localStorage.getItem('user')).token
    const router=this.$router
    const instance=axios.create({
      headers:{Authorization:token}
    })
    if(JSON.parse(localStorage.getItem('user')).isAdmin)
    {
      instance.post('/api/admin/userInfo')
      .then((res)=>{console.log(res);
        store.commit('setUserList',res.data);
      })
      .catch((err)=>{console.log(err);})

    }
    else{
      alert("관리자 계정이 아닙니다!")
      router.push('/');
    }
  },
  data() {
    return {
      columns: [
        {
          label: "Id",
          field: "id",
          filterOptions:{enabled: false}

        },
        {
          label: "Username",
          field: "username",

        },
        {
          label: "Email",
          field: "email",

        },
         {
          label: "Date",
          field: "date",

        },
         {
          label: "Roles",
          field: "roles",

        },
        {
          label: "Update",
          field: "update",

        },
        {
          label: "Writing",
          field: "writing"
        },
      ]
    };
  }
};
</script>
