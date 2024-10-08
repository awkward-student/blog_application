import React, { useEffect, useState } from 'react'
import { deletePostService, loadAllPost } from '../services/post-service'
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';
import Post from './Post';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

function NewFeed() {

    const [postContent, setPostContent] = useState({
        content:[],
        pageNumber:'',
        pageSize:'',
        totalElements:'',
        totalPages:'',
        lastPage:false
    })

    const [currentPage, setCurrentPage] = useState(0);

    // function setData(data){
    //     setPostContent({...postContent, content:data.content})
    //     setPostContent({...postContent, pageNumber:data.pageNumber})
    //     setPostContent({...postContent, pageSize:data.pageSize})
    //     setPostContent({...postContent, totalElements:data.totalElements})
    //     setPostContent({...postContent, totalPages:data.totalPages})
    //     setPostContent({...postContent, lastPage:data.lastPage})
    // }

    useEffect(()=>{
        changePage(currentPage)
    }, [currentPage])


    const changePage=(pageNumber=0, pageSize=5)=>{
        if(pageNumber>postContent.pageNumber && postContent.lastPage){
            return;
        }
        if(pageNumber<postContent.pageNumber && postContent.pageNumber==0){
            return;
        }
        loadAllPost(pageNumber, pageSize).then((data)=>{
            setPostContent({
                content:[...postContent.content,...data.content],
                pageNumber:data.pageNumber,
                pageSize:data.pageSize,
                totalElements:data.totalElements,
                totalPages:data.totalPages,
                lastPage:data.lastPage
            });
            console.log(data);
            window.scroll(0,0)
        }).catch((error)=>{
            console.log(error);
            toast.error("Error while loading posts");
        })
    };


    function deletePost(post){
        //going to del post
        deletePostService(post.postId).then(res=>{
            console.log(res);
            toast.success("Post Deleted");

            let newPostContents = postContent.content.filter(p=>p.postId!=post.postId)
            setPostContent({...postContent, content:newPostContents})

        }).catch((error)=>{
            console.log(error);
            toast.error("Error in deleting post")
        })
    }


    const changePageInfinite=()=>{
        console.log("page changed");
        setCurrentPage(currentPage+1)
    }


  return (
    <div className="container-fluid">
        <Row>
            <Col md={
                {
                    size:12
                }
            }>
                <h1>Blogs Count {postContent?.totalElements}</h1>

                <InfiniteScroll
                    dataLength={postContent.content.length}
                    next={changePageInfinite}
                    hasMore={!postContent.lastPage}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay, you have seen it all!</b>
                        </p>
                    }
                >
                {
                    postContent.content.map((post)=>(
                        <Post deletePost={deletePost} post={post} key={post.postId}/>
                    ))
                }
                </InfiniteScroll>

                {/* <Container className='text-center mt-3'>
                <Pagination size=''>
                    <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber==0}>
                        <PaginationLink previous>
                            Previous
                        </PaginationLink>
                    </PaginationItem>
                        {
                            [...Array(postContent.totalPages)].map((item, index)=>(
                                <PaginationItem onClick={()=>changePage(index)} active={index==postContent.pageNumber} key={index}>
                                    <PaginationLink>
                                        {
                                            index+1
                                        }
                                    </PaginationLink>
                                </PaginationItem>
                            )) 
                        }
                    <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                        <PaginationLink next>
                            Next
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
                </Container> */}
                
                

            </Col>
        </Row>
    </div>
  )
}

export default NewFeed