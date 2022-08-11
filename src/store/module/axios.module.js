import axios from "axios";


//token사용
//axios navar 컴포넌트에 Authorization 등록함
const authAxios=axios.create({
    baseURL: process.env.VUE_APP_API,
    headers:{
        withCredentils:true,
        "content-type":"application/json;charset=UTF-8",
    }
        
});
//token 미사용
const noAuthAxios=axios.create({
    baseURL: process.env.VUE_APP_API,
    headers:{
        withCredentials:true
    }

});
export {authAxios,noAuthAxios};
