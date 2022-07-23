import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter:0,
    name:'',
    number:0
  },
  getters:{
    getCounter: function(state){
      return state.counter;
    }
  },
  mutations:{
    addCounter: function (state) {
      return state.counter++;
    },
    equalPayload: function(state,payload){
      console.log("payload : "+payload.arr[0]);
      console.log("name : "+state.name);
      if(state.name == ''){
        state.name = payload.arr[0];
      }
      else if(state.name == state.arr[0]){
        state.name = payload.arr[1];
      }else if(state.name == state.arr[1]){
        state.name = payload.arr[0];
      }
      
      return state.name; 
    }
   
   
  }

})
