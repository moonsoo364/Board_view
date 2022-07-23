<template>
  <div>
    <div>Parent Getter : {{parentGetter}}</div>
    <div>Get Counter : {{getCounter}}</div>
    <button @click="addOne">+</button>
    <button @click="subCounter">-</button>
    <button @click="addPayload">Payload</button>
    <div>name : {{this.$store.state.name}}</div>
   
    <child/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Child from "./ChildComp.vue"
export default {
  data(){
    return{
      name: ''
    }
  },
  computed:{
    ...mapGetters([
      'getCounter'
    ]),
    parentGetter(){
        return this.$store.getters.getCounter;
    }
   
  },
  mounted:function(){
    console.log("mouted")
    console.log(this)
    console.log(this.$store);
  },
  methods:{

    subCounter(){
      this.$store.state.counter--;
    },  
    addOne(){
      return this.$store.commit('addCounter')
    },
    addPayload(){
      return this.$store.commit('equalPayload',{
        value: 10,
        arr: ["moonsoo","suzi","soi"]
      });
    }
  },
  components: {
    child: Child
  }
}
</script>

<style>

</style>