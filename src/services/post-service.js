import { PRIVATE_AXIOS } from "./helper";

export const createPost=(postData)=>{
    console.log(postData);
    return PRIVATE_AXIOS.post('/user/'+postData.userId+'/category/'+postData.categoryId+'/posts', postData).then((response) => response.data);
};