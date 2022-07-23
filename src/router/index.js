import VueRouter from "vue-router";
import BoardTable from "../views/BoardTable";
import JoinForm from "../views/JoinForm";
import LoginForm from "../views/LoginForm";
import FooterBar from "@/components/FooterBar";
import NavBar from "@/components/NavBar";
import CreateBoard from "@/views/CreateBoard.vue"
import DetailBoard from "@/views/DetailBoard.vue"
import HelloWorld from "@/views/HelloWorld.vue"

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
    }

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
    }
  },
  {
    path: "/detail",
    name: "detail",
   components: {
      header: NavBar,
      contents: DetailBoard,
      footer: FooterBar,
    }
  },
  {
    path: "/hello",
    name: "hello",
   components: {
      header: NavBar,
      contents: HelloWorld,
      footer: FooterBar,
    }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
