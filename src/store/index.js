
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userData: {token:'',username:'',expiredTime:0},//로그인 할때 ls저장
    counter:0,
    name:'',
    isLogin: false,
    boarduser: 'abcd12',
    boardList:[],
    maxPage:3,
    visiableNext:true,
    visiablePre:false

  },
  getters:{
    //---test---
    getCounter: function(state){
      return state.counter;
    },
    //---test---
    getBoarduser:function (state) {
      return state.boarduser;
    },
   
    compareUser:function(state){
      console.log((state.boarduser  == state.userData.username) ? true:false);
      return (state.boarduser  == state.userData.username) ? true:false; 
    },
    getBoardList:function (state) {
      return state.boardList;
    },

    getLoginState:function(state){

      if(localStorage.getItem('user')==null){
        state.isLogin=false;
        return state.isLogin;
      }else{
        state.isLogin=true;
        return state.isLogin;
      }
      
    },
    setLocationStorage:function(state){
      localStorage.removeItem('user');
      state.isLogin=false;
      state.userData.token='';
      state.userData.username='';

    },
    getUsername:function(state){
      return state.userData.username;
    },
    getNext:function(state){
      return state.visiableNext;
    },
    getPre:function(state){
      return state.visiablePre;
    }
  
  },
  mutations:{

    
    checkUserData:function(state,payload){
      //로그인 후 동작
      state.userData.username=payload.username;
      state.userData.token=payload.token;
      state.userData.expiredTime=payload.expiredTime;
      state.isLogin=true

      console.log("state.userData.expiredTime"+state.userData.expiredTime);
      localStorage.setItem('user',JSON.stringify(state.userData));
    },
    logout:function(state){
      // 1. 토큰 시간 지나면 로그아웃
      // 2. 로그아웃 버튼 누르면 로그아웃
      localStorage.removeItem('user');
      state.userData.token='';
      state.userData.username='';
      state.isLogin=false;

      alert("로그아웃 되었습니다!")
      
      
    },
    getStorage:function(state,payload){
     
      state.userData.username=JSON.parse(localStorage.getItem('user')).username;
      state.userData.expiredTime=payload;
      state.userData.token=JSON.parse(localStorage.getItem('user')).token;
      state.isLogin=true
      console.log("state.userData.username : "+state.userData.username);
      console.log("state.userData.expiredTime : "+state.userData.expiredTime);
      localStorage.setItem('user',JSON.stringify(state.userData));

      

    },
    commitBoardList:function(state,payload){
      // this.state.boardList=payload;
      localStorage.removeItem('board')
      localStorage.setItem('board',JSON.stringify(payload))
      let arr =[]
      if(payload.length<2){
        for(let i=0;i<payload.length;i++){
        arr.push(payload[i])
        }
      }else{
        for(let i=0;i<3;i++){
          arr.push(payload[i])
          }
      }
      state.boardList=arr;
      arr=[]

    },
    increase:function(state){

      let arr=JSON.parse(localStorage.getItem('board'));
      state.maxPage +=3
      state.visiablePre =true;
      if(state.maxPage>arr.length){
        alert('마지막 페이지입니다!')
        state.visiableNext=false;
        
      }else if(state.maxPage<=arr.length){
       
        state.boardList=[]
        for(let i=state.maxPage-3;i<state.maxPage;i++){
          state.boardList.push(arr[i])
        }
      }
      console.log("increase : "+state.maxPage);
    },

      
  
    decrease:function(state){
      let arr=JSON.parse(localStorage.getItem('board'));
      state.visiableNext=true;
      state.maxPage -=3
      if(state.maxPage<=3){
        state.visiablePre=false;
        
      }
      
        state.boardList=[]
        for(let i=state.maxPage-3;i<state.maxPage;i++){
          state.boardList.push(arr[i])
        }
      
      console.log("decrease : "+state.maxPage);
      // console.log(arr);
    },
    },
    
   
 
  actions:{
    asyncToken:async function(state,payload){
      // 시간이 지나면 로그아웃
      state.commit('checkUserData',{
        username:payload.username,
        token:payload.token,
        expiredTime:payload.expiredTime
      });
      await setTimeout(function(){state.commit('logout')},payload.expiredTime);
    },
    asyncStorage:function(state,payload){
      console.log(payload)
      if(payload.expired){
        state.commit('getStorage',payload.expiredTime)
      }else {
        state.commit('logout');
      }
      setTimeout(function(){state.commit('logout')},payload.expiredTime);
    }
  }

})
