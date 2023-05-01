import React, { useEffect, useState } from 'react'
import { loadAllPost } from '../services/post-service'
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';
import Post from './Post';
import { toast } from 'react-toastify';

function NewFeed() {

    const [postContent, setPostContent] = useState({
        content:[],
        pageNumber:'',
        pageSize:'',
        totalElements:'',
        totalPages:'',
        lastPage:false
    })

    // function setData(data){
    //     setPostContent({...postContent, content:data.content})
    //     setPostContent({...postContent, pageNumber:data.pageNumber})
    //     setPostContent({...postContent, pageSize:data.pageSize})
    //     setPostContent({...postContent, totalElements:data.totalElements})
    //     setPostContent({...postContent, totalPages:data.totalPages})
    //     setPostContent({...postContent, lastPage:data.lastPage})
    // }

    useEffect(()=>{
        changePage(0)
    }, [])


    const changePage=(pageNumber=0, pageSize=5)=>{
        if(pageNumber>postContent.pageNumber && postContent.lastPage){
            return;
        }
        if(pageNumber<postContent.pageNumber && postContent.pageNumber==0){
            return;
        }
        loadAllPost(pageNumber, pageSize).then((data)=>{
            setPostContent(data);
            console.log(data);
            window.scroll(0,0)
        }).catch((error)=>{
            console.log(error);
            toast.error("Error while loading posts");
        })
    };


  return (
    <div className="container-fluid">
        <Row>
            <Col md={
                {
                    size:10,
                    offset:1
                }
            }>
                <h1>Blogs Count {postContent?.totalElements}</h1>

                {
                    postContent.content.map((post)=>(
                        <Post post={post} key={post.postId}/>
                    ))
                }

                <Container className='text-center mt-3'>
                <Pagination size='lg'>
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
                </Container>
                
                

            </Col>
        </Row>
    </div>
  )
}

export default NewFeed