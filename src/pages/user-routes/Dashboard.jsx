import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import NewFeed from "../../components/NewFeed";
import { getCurrentUserDetail } from "../../auth";
import { deletePostService, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const Dashboard=()=>{

    const [user, setUser] = useState({})

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        console.log(getCurrentUserDetail())
        setUser(getCurrentUserDetail())
        loadPostData()
        
    }, [])

    //func load post data
    function loadPostData(){
        loadPostUserWise(getCurrentUserDetail().id)
        .then((data)=>{
            console.log(data)
            setPosts([...data].reverse());
        }).catch((error)=>{
            console.log(error);
            toast.error("erroe loading user post")
        })
    }


    // function to del post 
    function deletePost(post){
        //going to del post
        deletePostService(post.postId).then(res=>{
            console.log(res);
            toast.success("Post Deleted");
            let newPosts = posts.filter(p=>p.postId!=post.postId)
            setPosts([...newPosts])
        }).catch((error)=>{
            console.log(error);
            toast.error("Error in deleting post")
        })
    }

    return(
        <Base>
            <Container>
                <AddPost />
                <h1 className="my-3">
                    Posts count : {posts.length}
                </h1>
                {
                    posts.map((post, index)=>{
                        return(
                            <Post key={index} post={post} deletePost={deletePost}/>
                        )
                    })
                }
            </Container>
        </Base>
    )
}

export default Dashboard;
