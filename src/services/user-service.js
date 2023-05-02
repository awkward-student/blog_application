import { AXIOS } from "./helper"

export const signUp = (user) => {
    return AXIOS
    .post('/auth/register', user)
    .then((response) => response.data);
};

export const loginUser = (loginDetails) => {
    return AXIOS
    .post('/auth/login', loginDetails)
    .then((response) => response.data);
};

export const getUser=(userId)=>{
    return AXIOS.get('/users/'+userId).then(resp=>resp.data)
}