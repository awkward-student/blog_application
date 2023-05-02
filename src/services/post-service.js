import { AXIOS, PRIVATE_AXIOS } from "./helper";

// create post function 
export const createPost=(postData)=>{
    console.log(postData);
    return PRIVATE_AXIOS.post('/user/'+postData.userId+'/category/'+postData.categoryId+'/posts', postData).then((response) => response.data);
};

// get all posts 
export const loadAllPost=(pageNumber, pageSize)=>{
    return AXIOS.get('/posts?pageNumber='+pageNumber+'&pageSize='+pageSize+'&sortBy=addedDate&sortDir=desc').then((response)=>response.data);
};

// load single post by id 
export const loadPost=(postId)=>{
    return AXIOS.get("/posts/"+postId).then((response)=>response.data);
};

export const createComment=(comment, postId)=>{
    return PRIVATE_AXIOS.post('post/'+postId+'/comments', comment)
};

// uplaod post image 
export const uplaodPostImage=(image, postId)=>{
    let formData = new FormData();
    formData.append("image", image);
    return PRIVATE_AXIOS.post('/post/image/upload/'+postId, formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then((response)=>response.data);
};

// get category wise posts 
export function loadPostCategoryWise(categoryId)
{
    return PRIVATE_AXIOS.get('/category/'+categoryId+'/posts')
    .then((response)=>response.data);
} 


export function loadPostUserWise(userId){
    return PRIVATE_AXIOS.get('/user/'+userId+'/posts')
    .then((response)=>response.data)
}


export function deletePostService(postId){
    return PRIVATE_AXIOS.delete('/posts/'+postId)
    .then(res=>res.data);
}

// update post
export function updatePost(post, postId){
    return PRIVATE_AXIOS.put('/posts/'+postId, post)
    .then(res=>res.data);
}