import VueRouter from "vue-router";
import BoardTable from "../views/BoardTable";
import JoinForm from "../views/JoinForm";
import LoginForm from "../views/LoginForm";
import FooterBar from "@/components/FooterBar";
import NavBar from "@/components/NavBar";
import CreateBoard from "@/views/CreateBoard.vue"
import DetailBoard from "@/views/DetailBoard.vue"
import UpdateBoard from "@/views/UpdateBoard.vue"
import UserInfo from "@/views/UserInfo.vue";
import TabContainer from"@/example/TabContainer.vue"
import UpdateUserVue from "@/views/UpdateUser.vue";
import WritingUserVue from "@/views/WritingUser.vue";


import Vue from"vue";



Vue.use(VueRouter);



const routes = [
  {
    path: "/",
    name: "home",
    components: {
      header: NavBar,
      contents: BoardTable,
      footer: FooterBar,
    },
   

  },
  {
    path: "/login",
    name: "login",
    components: {
      header: NavBar,
      contents: LoginForm,
      footer: FooterBar,
    }
  },
  {
    path: "/join",
    name: "join",
   components: {
      header: NavBar,
      contents: JoinForm,
      footer: FooterBar,
    }
  },
  {
    path: "/create",
    name: "create",
   components: {
      header: NavBar,
      contents: CreateBoard,
      footer: FooterBar,
    },
    beforeEnter: (to,from,next)=>{
      if(localStorage.getItem('user')!=null){
        next();  
      }else{
       
        alert("접근 권한이 없습니다.")
        next('/');
      }
    }
 
  },
  {
    path: "/detail/:id",
    name: "detail",
   components: {
      header: NavBar,
      contents: DetailBoard,
      footer: FooterBar,
    },
    beforeEnter: (to,from,next)=>{
      if(localStorage.getItem('user')!=null){
        next();  
      }else{
       
        alert("접근 권한이 없습니다, 로그인을 해주세요")
        next('/login');
      }
    }
  },
  {
    path: "/userinfo",
    name: "userinfo",
   components: {
      header: NavBar,
      contents: UserInfo,
      footer: FooterBar,
    },
    beforeEnter: (to,from,next)=>{
      if(localStorage.getItem('user')!=null){
        next();  
      }else{
       
        alert("접근 권한이 없습니다, 로그인을 해주세요")
        next('/login');
      }
    }
  },
  {
    path: "/update/:id",
    name: "update",
   components: {
      header: NavBar,
      contents: UpdateBoard,
      footer: FooterBar,
    },
    beforeEnter: (to,from,next)=>{
      if(localStorage.getItem('user')!=null){
        next();  
      }else{
       
        alert("접근 권한이 없습니다, 로그인을 해주세요")
        next('/login');
      }
    }
},
{
  path: "/test",
  name: "test",
 components: {
    header: NavBar,
    contents: TabContainer,
    footer: FooterBar,
  },
  beforeEnter: (to,from,next)=>{
    if(localStorage.getItem('user')!=null){
      next();  
    }else{
     
      alert("접근 권한이 없습니다, 로그인을 해주세요")
      next('/login');
    }
  }
},
{
  path: "/updateUser/:id/:name",
  name: "updateUser",
 components: {
    header: NavBar,
    contents: UpdateUserVue,
    footer: FooterBar,
  },
  beforeEnter: (to,from,next)=>{
    if(localStorage.getItem('user')!=null){
      next();  
    }else{
     
      alert("접근 권한이 없습니다, 로그인을 해주세요")
      next('/login');
    }
  }
},
{
  path: "/writinguser/:id/:name",
  name: "writingUser",
 components: {
    header: NavBar,
    contents: WritingUserVue,
    footer: FooterBar,
  },
  beforeEnter: (to,from,next)=>{
    if(localStorage.getItem('user')!=null){
      next();  
    }else{
     
      alert("접근 권한이 없습니다, 로그인을 해주세요")
      next('/login');
    }
  }
},

 

    
  

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});



export default router;
