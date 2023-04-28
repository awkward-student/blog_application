// checking if any user is alreay logged in 
export const isLoggedIn=()=>{
    let data = localStorage.getItem("data");
    if(data!=null) return true;
    else return false;
};

// setting user data to local storage on login 
export const doLogin=(data, next)=>{
    localStorage.setItem("data", JSON.stringify(data));
    next();
};

// logging out current user 
export const doLogout=(next)=>{
    localStorage.removeItem("data");
    next();
};

// get current user 
export const getCurrentUserDetail=()=>{
    if(isLoggedIn) return JSON.parse(localStorage.getItem("data")).user;
    else return false;
};