import router from "@/router";
import {noAuthAxios,authAxios} from "@/store/module/axios.module";
import moment from "moment";

export const userStore=({

  state: {
    userData: {token:'',username:'',expiredTime:0,isAdmin:false,id:0},//로그인 할때 ls저장
    isLogin: false,
    noOverlapId:false,
    isExitedPw:false,
    userList:[],
  },
  getters:{
   
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
    getUserData:function(state){

      return state.userData;
    },

    getAdmin:function(state){
      return state.userData.isAdmin;
    }
    ,
    getUserList:function(state){
      return state.userList;
    },
    getNoOverLapId:function(state){
      return state.noOverlapId;
    },
    getIsExistedPw:function(state){
      return state.isExitedPw;
    }

  },
  mutations:{

    
    setUserData:function(state,payload){
      //로그인 후 동작 *LoginForm
      localStorage.removeItem('user');
      state.userData.username=payload.username;
      state.userData.token=payload.token;
      state.userData.expiredTime=payload.expiredTime;
      state.userData.isAdmin=payload.admin;
      state.userData.id=payload.id;
      state.isLogin=true// *NavBar 로그인 상태 토클

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
      state.userData.username=payload.username;
      state.userData.token=payload.token;
      state.userData.isAdmin=payload.isAdmin;
      state.isLogin=true
      localStorage.removeItem('user');
      localStorage.setItem('user',JSON.stringify(state.userData));

    },

    setUserList:function(state){

      authAxios.post('/admin/all_user_infomation')
      .then((res)=>{console.log(res);
        state.userList=res.data;
        for(let i=0;i<state.userList.length;i++){
          
          state.userList[i].createDate =moment(state.userList[i].createDate).format("yyyy/MM/DD h:mm:ss a");
        }
        console.log(state.userList);
      })
      .catch((err)=>{
        console.log(err);
      })
      
     
      
    },
    overlapCheckId:function(state,payload){
      if(payload){
        noAuthAxios.post('/name_check',{
          username:payload
        }).then(function(res){
          if(res.data){
            alert("사용가능한 아이디입니다.");
            state.noOverlapId=true;
          }else{
            alert("중복된 아이디입니다.");
          }
        }).catch((err)=>{
          console.log(err);
          alert("아이디확인 불가!")
        })

      }else{
        alert("아이디를 먼저 입력하세요!")
      }
    },
    inverseOverlapId:function(state){
      state.noOverlapId = !state.noOverlapId;
    },
    existedPassword:function(state,payload){
      authAxios.post('/admin/password_existing',{
        password:payload.password,id:payload.id})
        .then((res)=>{
            console.log(res.data);
            if(res.data){
              alert("이미 사용하고 있는 비밀번호입니다.");
              state.isExitedPw=false;

            }else{
              alert("사용가능한 비밀번호입니다.");
             
              state.isExitedPw=true;
            }
        }).catch(function(err){
            alert("JWT이 제대로인식이 안됩니다!")
            console.log(err);

        })
    },
    updateUser:function(state,payload){
      authAxios.post('/admin/user_update',{
        password:payload.password,
        email:payload.email,
        id:payload.id
      }).then(function(res){  
        console.log(res);
        alert("회원 정보 수정완료!")
        router.push("/userinfo");
    }).catch((e)=>{
          console.log(e);
          alert("회원가입 실패 !");
    })
    },
    togleExitedPw:function(state,){
      state.isExitedPw=!state.isExitedPw;
      console.log(state.isExitedPw);
    },
   
  },
    
  actions:{
    userJoin: function(state,payload){
      noAuthAxios.post('/user_join',{
        username:payload.username,
        password:payload.password,
        email:payload.email,
        roles:payload.role
      }).then(function(res){
        console.log(res.data);
        console.log(authAxios);
        alert("회원가입 성공 !");
        router.push('/')
      }).catch((err)=>{
         console.log(err);
         alert("회원가입 실패 !")

      })
    },
    loginUser:function(state,payload){
      noAuthAxios.post('/user_login',{
        username:payload.username,
        password:payload.password,
      }).then((res)=>{
        alert("로그인 성공!");
        router.push('/');
        console.log(res);
        state.commit('setUserData',{
          username:payload.username,
          token:res.data.token,
          expiredTime:res.data.expiredTime,
          admin:res.data.admin,
          id:res.data.id
        });
        setTimeout(function(){state.commit('logout')},res.data.expiredTime);
      }).catch(err=>{
         console.log(err);
        if(err.response.data.code==1){
          alert("비밀번호가 일치하지 않습니다!")
        }else if(err.response.data.code==2){
          alert("존재하지 않는 아이디 입니다!")
        }
      })    
    },
    checkUserToken:function(state){
      const username=JSON.parse(localStorage.getItem('user')).username;
      const token=JSON.parse(localStorage.getItem('user')).token;
      const isAdmin=JSON.parse(localStorage.getItem('user')).isAdmin;

      authAxios.post("/auth/token_check")
      .then(function(res){
        console.log(res);
        if(res.data.validated){
          state.commit('getStorage',{
            restedTime:res.data.restedTime,
            username:username,
            token:token,
            isAdmin:isAdmin
          });
          setTimeout(function(){state.commit('logout')},res.data.restedTime);
        }else {
          state.commit('logout');
        }

      })
      .catch(function(err){
         console.log(err);
         state.commit('logout');         
      })
      }
  },
  

})
