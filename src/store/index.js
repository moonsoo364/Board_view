

import Vue from 'vue'
import router from '../router';
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //isAdmin userData에 담기
    userData: {token:'',username:'',expiredTime:0,isAdmin:false},//로그인 할때 ls저장
    counter:0,
    name:'',
    isLogin: false,
    boardList:[],
    maxPage:3,
    visiableNext:true,
    visiablePre:false,
    BoardData:{title:'',content:'',username:'',correctUser:false,id:0},
    detailBoardList:[],
    isUpdateBoard:false,
    isDeleteBoard:false

   

  },
  getters:{
   
   
    getBoardList:function (state) {

        return state.boardList;

    },

    getLoginState:function(state){
      //*NavBar
      //용도: 새로고침할 때도 사용자 정보 유지
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
      //*NavBar
      //용도 : 로그인 ID 화면 표시
      return state.userData.username;
    },
    getNext:function(state){
      //*BoardTable
      return state.visiableNext;
    },
    getPre:function(state){
      //*BoardTable
      return state.visiablePre;
    },
    getBoardData:function(state){
      return state.BoardData
    },
    getAdmin:function(state){
      return state.userData.isAdmin;
    }
  
  },
  mutations:{

    
    setUserData:function(state,payload){
      //로그인 후 동작 *LoginForm
      state.userData.username=payload.username;
      state.userData.token=payload.token;
      state.userData.expiredTime=payload.expiredTime;
      state.userData.isAdmin=payload.admin;
      console.log("setuser : "+state.isAdmin);
      state.isLogin=true// *NavBar 로그인 상태 토클

      console.log("state.userData.expiredTime"+state.userData.expiredTime);
      localStorage.setItem('user',JSON.stringify(state.userData));
    },
    logout:function(state){
      // *LoginForm, *NavBar
      // 1. 토큰 시간 지나면 로그아웃 *LoginForm
      // 2. 로그아웃 버튼 누르면 로그아웃
      localStorage.removeItem('user');
      state.userData.token='';
      state.userData.username='';
      state.userData.isAdmin=false;
      state.isLogin=false;
      

      alert("로그아웃 되었습니다!")
      router.push('/')
      
      
    },
    getStorage:function(state,payload){
     
      
      state.userData.username=JSON.parse(localStorage.getItem('user')).username;
      state.userData.expiredTime=payload;
      state.userData.token=JSON.parse(localStorage.getItem('user')).token;
      state.userData.isAdmin=JSON.parse(localStorage.getItem('user')).isAdmin;
      state.isLogin=true
      console.log("state.userData.username : "+state.userData.username);
      console.log("state.userData.expiredTime : "+state.userData.expiredTime);
      localStorage.setItem('user',JSON.stringify(state.userData));

      

    },
    commitBoardList:function(state,payload){
      //*BoardTable
      //용도: 게시글 페이지 초기 화면 설정
     
      localStorage.removeItem('board')
      localStorage.setItem('board',JSON.stringify(payload))
      let arr =[]
      state.maxPage=3;
      state.visiableNext=true;
      console.log("payload.length : "+payload.length);
      if(payload.length<=2){
         for(let i=0;i<payload.length;i++){
          arr.push(payload[i])
         }
         state.boardList=arr;
      }else{

      for(let i=0;i<3;i++){
          arr.push(payload[i])
          
      }
      state.boardList=arr;
    }
     
      console.log(state.boardList);
      arr=[]

    },
    increase:function(state){
      //*BoardTable
      //다음 게시물 3개 보여줌
      let arr=JSON.parse(localStorage.getItem('board'));
      state.maxPage +=3
      state.visiablePre =true;//이전 버튼 안보임 방지
      state.boardList=[]
      if(state.maxPage>arr.length){
        
      state.visiableNext=false;
      alert("마지막 페이지 입니다.")
        for(let i =state.maxPage-3 ;i<arr.length%3+state.maxPage-3;i++){
          state.boardList.push(arr[i])
        }
        
      }else if(state.maxPage<=arr.length){
       
       
        for(let i=state.maxPage-3;i<state.maxPage;i++){
          state.boardList.push(arr[i])
        }
      // }
      console.log("increase : "+state.maxPage);
      }
  },
      
  
    decrease:function(state){
      //*BoardTable
      //이전 게시물 3개 보여줌
      let arr=JSON.parse(localStorage.getItem('board'));
      state.visiableNext=true;//다음 버튼 안보임 방지
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
    selectByBoardId:function(state,payload){
      state.BoardData={}
      state.BoardData.content=payload.content;
      state.BoardData.title=payload.title;
      state.BoardData.username=payload.username;
      state.BoardData.correctUser=payload.correctUser;
      state.BoardData.id=payload.id;

    },
    selectBoardList:function(state,payload){
      state.detailBoardList=payload;
      console.log(state.detailBoardList);
    },
    setDetailBoard:function(state,payload){
      console.log(payload);
      
      for(let i=0;i<state.detailBoardList.length;i++){
        if(state.detailBoardList[i].id==payload){
          state.BoardData=state.detailBoardList[i]
          break;
        }
      }
      console.log(state.BoardData);
    },
    getDetailBoard:function(state,payload){
      //router에서 받은 params값으로 게시물 찾는 과정
      for(let i=0;i<state.detailBoardList.length;i++){
        if(state.detailBoardList[i].id==payload){
          state.BoardData=state.detailBoardList[i]
          break;
        }
      }
      //현재 로그인 된 계정과 작성자를 비교
      const username=JSON.parse(localStorage.getItem('user')).username;
      if(username==state.BoardData.username){
        state.BoardData.correctUser=true;
      }else{
        state.BoardData.correctUser=false;
      }
    }
    },
    
   
 
  actions:{
    asyncToken: function(state,payload){
      // 시간이 지나면 로그아웃 *LoginForm
      state.commit('setUserData',{
        username:payload.username,
        token:payload.token,
        expiredTime:payload.expiredTime,
        admin:payload.admin
      });
      setTimeout(function(){state.commit('logout')},payload.expiredTime);
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
