<template>
  <div>
   <button-tab>
      <template slot-scope="scopeProps">
        {{ scopeProps.message }}
      </template>
   </button-tab>
  </div>
</template>

 


<script>
import ButtonTab from './ButtonTab.vue'
export default {
  components: {
    ButtonTab
  }
}
</script>
 