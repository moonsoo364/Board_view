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
//vue2-editor : 글쓰기 에디터 라이브러리
import Vue2Editor from "vue2-editor"
//@carbon/bue : file upload 라이브러리
import CarbonComponentVue from "@carbon/vue";
import CarbonCss from "carbon-components/css/carbon-components.min.css";



Vue.use(CarbonCss);
Vue.use(CarbonComponentVue);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vue2Editor)
Vue.directive('b-hover', VBHover)
Vue.use(VueGoodTablePlugin)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
