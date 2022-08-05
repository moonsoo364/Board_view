<template>
<div>
    
<b-navbar toggleable="lg" type="dark" variant="info">
    
    
    <router-link to="/" style="text-decoration:none; margin-left: 5px;"><b-navbar-brand>Home</b-navbar-brand></router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse v-if="loginState" id="nav-collapse" is-nav>
       <b-navbar-nav>
        <router-link to="/create"><span class="nav-link">글쓰기</span></router-link>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item class="nav-link" @click="doLogout">로그아웃</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="getAdmin">
        <router-link to="/userinfo"><span class="nav-link">관리자</span></router-link>
      </b-navbar-nav>
          <b-avatar style="color:rgba(255, 255, 255,0.8)"></b-avatar>
          <span style="color:rgba(255, 255, 255,0.8)">{{getUsername}}님 반갑습니다!</span>
    </b-collapse>

    <b-collapse v-else id="nav-collapse"  is-nav>
      <b-navbar-nav>
        <b-nav-item v-for="item in navbars" :key="item.id">
          <router-link :to="{path:item.router}" class="active">{{item.menu}}</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    
</b-navbar>

</div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex';


export default {
  name:"NavBar", 

  
 mounted(){
    
    const store =this.$store;
    if(localStorage.getItem('user')!=null){
    const token =JSON.parse(localStorage.getItem('user')).token
    const instance =axios.create({
      headers:{Authorization:token}
    })
    instance.post("/api/auth/expiredCheckToken")
    .then(function(res){
      store.dispatch('asyncStorage',{
        expiredTime:res.data.restedTime,
        expired:res.data.validated
      });
    })
    .catch(function(err){
       console.log(err);
       store.commit('logout');         
    })
    }

    
 },
 
  computed:{
    ...mapGetters(['getAdmin']),
    loginState(){
      return this.$store.getters.getLoginState;
    },
    getUsername(){
      return this.$store.getters.getUsername;
    }
  },
      data(){
            return{
                hover:false,
                compute:0,
                navbars:[
                  {menu: '로그인', router:'/login',id:1},
                  {menu: '회원가입', router:'/join',id:2},
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
  color: rgba(255,255,255,0.8);
}
.active:hover{
  font-weight: bold;
}
.navbar-brand, .nav-link{
  font-size: 1.5rem;

}


</style>