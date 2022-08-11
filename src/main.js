//vue기본 라이브러리
import Vue from "vue";
import App from "./App.vue"
import router from "./router"
import store from "./store"
//vue-good-table : 테이블 생성 라이브러리 
import VueGoodTablePlugin from "vue-good-table"
import "vue-good-table/dist/vue-good-table.css"
//Bootsrapvue : css 적용 라이브러리 
import { BootstrapVue, IconsPlugin, VBHover } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//axios

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.directive('b-hover', VBHover)
Vue.use(VueGoodTablePlugin)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
