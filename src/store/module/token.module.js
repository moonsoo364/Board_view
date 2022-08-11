export function getToken() {
    let token =localStorage.getItem('user')?
    JSON.parse(localStorage.getItem('user')).token
    :null;
    console.log(token);
  
    return token;
    
}