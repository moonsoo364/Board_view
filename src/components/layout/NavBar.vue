<template>
<div>
    
<b-navbar toggleable="lg" type="dark" variant="info">
    
    
    <router-link to="/" style="text-decoration:none;"><b-navbar-brand>Home</b-navbar-brand></router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse v-if="login_state" id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>글쓰기</b-nav-item>
        <b-nav-item>로그아웃</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <b-collapse v-else id="nav-collapse"  is-nav>
      <b-navbar-nav>
        <b-nav-item >
          <router-link to="/login" class="active">로그인</router-link>
        </b-nav-item>
        <b-nav-item >
          <router-link to="/join" class="active">회원가입</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>

</b-navbar>

</div>
</template>
<script>

export default {
      data(){
            return{
                login_state:false,
                hover:false
            }
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
  margin: 0 10px 0 10px;
}
</style>