import Vue from "vue";
import VueRouter from "vue-router";
import BoardTable from "../views/BoardTable";
import JoinForm from "../views/JoinForm";
import LoginForm from "../views/LoginForm";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: BoardTable,
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/join",
    name: "join",
    component: JoinForm,
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
