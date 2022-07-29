<template>
  <div>
    User{{$route.params.id}}
    <router-link :to="{name: 'test', params:'{id:12}'}">이동</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>