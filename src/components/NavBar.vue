<template>
<div>
    
<b-navbar style="font-size: 1.2rem;" toggleable="lg" type="dark" variant="info">
    
   
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse v-if="getLoginState" id="nav-collapse" is-nav>

      <div class="login_nav"><router-link to="/">Home</router-link></div>
      <div class="login_nav"><router-link to="/create">글쓰기</router-link></div>
      <div style="cursor:pointer;" class="login_nav" @click="doLogout">로그아웃</div>
      <div class="login_nav"><router-link v-if="getAdmin" to="/userinfo">관리자</router-link></div>
      <div style="color:white;" class="login_nav">
        <b-icon icon="person-fill"></b-icon>
        {{getUserData.username}}님 반갑습니다!
      </div>
      
      
    
    </b-collapse>

    <b-collapse v-else id="nav-collapse"  is-nav>

        <b-nav-item v-for="item in navbars" :key="item.id">
          <router-link :to="{path:item.router}">{{item.menu}}</router-link>
        </b-nav-item>

    </b-collapse>
    
</b-navbar>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getToken } from '@/store/module/token.module';
import { authAxios } from '@/store/module/axios.module';
export default {
  name:"NavBar", 
  created(){
    authAxios.defaults.headers.common['Authorization']=getToken(); 
    if(localStorage.getItem('user')!=null){
      this.$store.dispatch('checkUserToken');
    }
  },
  updated(){
    authAxios.defaults.headers.common['Authorization']=getToken();
  },
  computed:{
   
   ...mapGetters(['getAdmin','getUserData','getLoginState']),
   
  },
  data(){
    return{
        navbars:[
          {menu: 'Home', router:'/',id:1},
          {menu: '로그인', router:'/login',id:2},
          {menu: '회원가입', router:'/join',id:3},
        ],   
    }
    },
  methods:{
    doLogout:function(){
      this.$store.commit('logout')
    },
  }
}
</script>
<style scoped>
  a{
    text-decoration: none;
    color:white;
  }
  li{
    list-style: none;
  }
  #nav-collapse{
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .login_nav{
    padding: 0.5rem 1rem;
    color: white;
  }
  .login_nav:hover{
    color: #0a58ca;
  }

  
</style>