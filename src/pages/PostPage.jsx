import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { createComment, loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";

const Posts=()=>{

    const {postId}=useParams()

    const [post, setPost] = useState({
        content:'',
        comments:[],
        title:'',
        user:'',
        category:'',
        imageName:'default.png',
        addedDate:'',
        postId:''
    })

    const [comment, setComment] = useState({
        content:''
    })

    useEffect(()=>{
        // load post from post id 
        loadPost(postId).then((data)=>{
            console.log(data);
            setPost(data)
        }).catch((error)=>{
            console.log(error);
            toast.error("Error in loading post")
        })
    }, [])

    const printDate=(numbers)=>{
        return new Date(numbers).toLocaleDateString();
    }

    const submitPost=()=>{
        if(!isLoggedIn()){
            toast.error("Need to login first.")
            return
        }
        if(comment.content.trim()===''){
            return;
        }
        createComment(comment, post.postId)
        .then((data)=>{
            console.log(data);
            toast.success("Comment added")
            setPost({
                ...post,
                comments:[...post.comments, data.data]
            })
            setComment({
                content:''
            })
        }).catch((error)=>{
            console.log(error);
            toast.error("Comment not uploaded")
        })
    }

    return(
        <Base>
            <Container>
                <Link to='/'>
                    Home
                </Link> / {post && (<Link to="">{post.title}</Link>)}
                <Row>
                    <Col md={{
                        size: 12
                    }}>
                        
                        <Card  className="mt-3 ps-2 border-0 shadow" >
                            {
                                (post) && (
                                    <CardBody>
                                        <CardText>
                                            Posted By <b>{post.user.name}</b> on {printDate(post.addedDate)}
                                        </CardText>
                                        <CardText>
                                            <span className="text-muted">{post.category.categoryTitle}</span>
                                        </CardText>

                                            <div className="divider" style={{
                                                width:'100%',
                                                height:'1px',
                                                background:'#e2e2e2'
                                            }}></div>

                                        <CardText className="mt-3">
                                            <h1>{post.title}</h1>
                                        </CardText>
                                        <div className="image-container mt-4 shadow" style={{maxWidth:'50%'}}>
                                            <img className="img-fluid" src={BASE_URL+'/post/image/'+post.imageName} />
                                        </div>
                                        <CardText className="mt-5" dangerouslySetInnerHTML={{__html:post.content}}>

                                        </CardText>
                                    </CardBody>
                                )
                            }
                        </Card>

                    </Col>
                </Row>

                <Row className="my-4">
                    <Col md={{
                        size:9,
                        offset:1
                    }}>
                        <h3>Comments ( { post ? post.comments.length : 0 } ) </h3>
                        {
                            post.comments && post.comments.map((c,index)=>(
                                <Card className="mt-2 border-0" key={index}>
                                    <CardBody>
                                        <CardText>
                                            {c.content}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))
                        }

                                <Card className="mt-2 border-0">
                                    <CardBody>
                                        <Input type="textarea" 
                                        placeholder="Enter comment"
                                        value={comment.content}
                                        onChange={(event)=>setComment({content:event.target.value})}
                                        />
                                        <Button onClick={submitPost} className="mt-2" color="primary">Submit</Button>
                                    </CardBody>
                                </Card>

                    </Col>
                </Row>
            </Container>
        </Base>
    )
};

export default Posts;