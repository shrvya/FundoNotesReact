export const getToken = () => {
  // console.log("gettoke"+sessionStorage.getItem('token'));
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token) => {
    let checktoken=sessionStorage.setItem('token', token);
    console.log("settoke"+checktoken);
    sessionStorage.setItem('token', token);

  }