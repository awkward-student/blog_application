import { AXIOS, PRIVATE_AXIOS } from "./helper";

// create post function 
export const createPost=(postData)=>{
    console.log(postData);
    return PRIVATE_AXIOS.post('/user/'+postData.userId+'/category/'+postData.categoryId+'/posts', postData).then((response) => response.data);
};

// get all posts 
export const loadAllPost=(pageNumber, pageSize)=>{
    return AXIOS.get('/posts?pageNumber='+pageNumber+'&pageSize='+pageSize).then((response)=>response.data);
};