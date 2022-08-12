import router from "@/router";
import moment from "moment";
import { noAuthAxios,authAxios } from "./axios.module";


export const  boardStore=({

  state: {
    boardList:[],
    maxPage:3,
    visiableNext:true,
    visiablePre:false,
    isWriter:false,
    BoardData:{title:'',content:'',username:'',correctUser:false,id:0,filename:[]},
    writingList:[],
    uploadFileOK:false,
    loadingBoardOK:false,


  },
  getters:{
   
    getBoardList:function (state) {
        return state.boardList;
    },
    getMaxPage:function(state){
        return state.maxPage;
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

    getWritingList:function(state){
      return state.writingList;
    },
    getUploadFileOK(state){
        return state.uploadFileOK;
    },
    getLoadBoardOK(state){
      return state.loadingBoardOK;
    }

  },
  mutations:{
  
    commitBoardList:function(state,payload){
      //*BoardTable
      //용도: 게시글 페이지 초기 화면 설정
     
      localStorage.removeItem('board')
      localStorage.setItem('board',JSON.stringify(payload))
      let arr =[]
      state.maxPage=3;
      state.visiableNext=true;
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
    goFirstPage:function(state){
        state.maxPage=3;
        state.visiableNext=true;
        state.visiablePre=false;
        let arr=JSON.parse(localStorage.getItem('board'));
        state.boardList=[];
        for(let i=state.maxPage-3;i<state.maxPage;i++){
          state.boardList.push(arr[i])
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
        authAxios
          .post("/auth/board_detail",{id:payload})
          .then((res)=>{
            state.BoardData=res.data;
            state.BoardData.correctUser =JSON.parse(localStorage.getItem('user')).username==res.data.username;
            console.log(res.data);
      
          })
          .catch((err)=>{console.log(err);})
       console.log(state.BoardData);

    },
    selectWritingList:function(state,payload){
      state.writingList=payload;
      state.writingList=[];
      for(let i=0;i<payload.length;i++){
        let sliceContent =payload[i].content.length>100
        ?payload[i].content.split('</')[0]+"..."
        :payload[i].content;

        state.writingList.push({
        id : payload[i].id,
        title : payload[i].title,
        content : sliceContent,
        date : moment(payload[i].createTime).format("yyyy/MM/DD h:mm:ss a"),
        username : payload[i].username, 
      })
      }
      
      console.log(state.writingList);
    },
    deleteBoard:function(state){
        console.log(state.BoardData.id);
        authAxios.post('/auth/board_delete',{
            id:state.BoardData.id,
        }).then(function(res){
            console.log(res);
            state.isDeleteBoard=true;
            router.push('/');
            alert("게시글이 삭제되었습니다!");
        }).catch((e)=>{
            console.log(e);
            alert("게시물 삭제 불가!")
        })
    },
    updateBoard:function(state,payload){
        console.log(state.BoardData.id);
        authAxios.post('/auth/board_update',{
            id:state.BoardData.id,
            title:state.BoardData.title,
            content:state.BoardData.content,
            filename:payload,
        }).then(function(res){
            console.log(res);
            router.push('/');
            alert("게시글이 수정되었습니다!");
        }).catch((e)=>{
            console.log(e);
            alert("게시물 수정 불가!")
        })
    },
    setFileUploadFalse:function(state){
        console.log(state.uploadFileOK);
        state.uploadFileOK = false;

    },
    submitFiles:function(state,payload){
        authAxios.post("/auth/file_submit",payload,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })
        .then((res)=>{
          console.log(res);
          if(res.data){
            state.uploadFileOK =true;
          }else{
            state.uploadFileOK =false;
          }
         })
        .catch((err)=>{
            console.log(err);
            if(err.code === "ERR_NETWORK"){
                alert("파일 용량을 10MB 미만으로 업로드해주세요!");
            }
        })
    },
    downloadFile(state,payload){
        console.log(payload);
        authAxios.post('/auth/download',payload,{responseType: "blob"})
        .then((res)=>{
            console.log(res);
            const url =window.URL.createObjectURL(new Blob([res.data]));
            const link =document.createElement('a');
            link.href=url;
            link.setAttribute('download',payload);
            document.body.appendChild(link);
            link.click();
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    loadedBoard(state,payload){
      
      state.BoardData=payload;
      state.BoardData.correctUser =JSON.parse(localStorage.getItem('user')).username==payload.username;
      state.loadingBoardOK=true;
    },
    loadBoardOK(state){
      state.loadingBoardOK =true;
    },
    loadBoardNO(state){
      state.loadingBoardOK =false;
    }   
    
    },
    
  actions:{
    selectBoard:function(state){
        state.visiablePre=false;
        state.maxPage=3;
        noAuthAxios.post("/board_select")
        .then(function(res){
            console.log(res.data);
            state.commit('commitBoardList',res.data);

        })
        .catch(function(err){

            console.log(err);

        })
    },
    insertBoard:function(state,payload){

        authAxios.post('/auth/board_insert',{
            title:payload.title,
            content:payload.content,
            filename:payload.filename,
        }).then(function(res){
            console.log(res);
            router.push('/');
            alert("게시글이 등록되었습니다!");
        }).catch((e)=>{
            console.log(e);
        })
    },
    selectUserWriting:function(state,payload){
        authAxios.post("/admin/user_writing",{id:payload
        }).then((res)=>{
            console.log(res);
            state.commit('selectWritingList',res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },
    deleteBoardById:function(state,payload){
        authAxios.post("/auth/board_delete",{
            id:payload
        }).then((res)=>{
            console.log(res);
            alert('해당 유저의 게시글이 삭제 되었습니다!');
            router.push({name:"userinfo"});

        }).catch((err)=>{
            alert('게시물 삭제가 거부됬습니다!');
            console.log(err);
        })
    },
      loadBoard: function(state,payload){
        state.commit('loadBoardNO');


        console.log(payload);
        authAxios
          .post("/auth/board_detail",{id:payload})
          .then((res)=>{
            console.log(res.data);
            setTimeout(function(){state.commit('loadedBoard',res.data)},1000);
          })
          .catch((err)=>{console.log(err);})

    },    
  },
  

})
