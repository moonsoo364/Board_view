
<template>
  <div id="app">
    <router-link to="/"></router-link>  
    <router-view/>
  </div>
</template>

<script>
/* eslint no-use-before-define: 0 */
import Vue from 'vue'
import { BootstrapVue, IconsPlugin, VBHover } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.directive('b-hover', VBHover)
export default {


}
</script>

<style>
*body{
  margin:0px;

}
</style>