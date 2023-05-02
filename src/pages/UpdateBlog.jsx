import React, { useContext, useEffect, useRef, useState } from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/userContext'
import { loadPost, updatePost as doUpdatePost } from '../services/post-service'
import { toast } from 'react-toastify'
import JoditEditor from "jodit-react";
import { getCurrentUserDetail } from '../auth'
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { loadAllCategories } from '../services/category-service'

function UpdateBlog() {

    const [categories, setCategories] = useState([]);

    const { blogId } = useParams()

    const object = useContext(userContext)

    const navigate = useNavigate()

    const [post, setPost] = useState(null)

    const editor = useRef(null);

    useEffect(()=>{

        loadAllCategories().then((data)=>{
            console.log(data);
            setCategories(data);
        }).catch(error=>{
            console.log(error);
        })

        // load blog from database 
        loadPost(blogId).then((data)=>{
            console.log("run")
            console.log(data);
            setPost({...data, categoryId:data.category.categoryId})
        }).catch((error)=>{
            console.log(error);
            toast.error("Error in loading blog post");
        }, [])
        }, []);


        
    

    useEffect(()=>{
        console.log("first");
        if(post){
            if(post.user.id != object.user.data.id){
                toast.error("This is not your post")
                navigate("/")
            }
        }
    }, [post])
    // post can be passed above 

    const handleChange=(event, fieldName)=>{
        console.log(post)
        setPost({
            ...post,
            [fieldName]: event.target.value
        })
    }

    const updatePost =(event)=>{
        event.preventDefault();
        console.log(post)
        doUpdatePost({...post,
            category:{categoryId:post.categoryId}
        }, post.postId).then(response=>{
            console.log(response);
            toast.success("Post Updated")
        }).catch((error)=>{
            console.log(error);
            toast.error("Error in updating post")
        })
    }

    const updateHtml = () =>{
        return(
            <div className="wrapper">
            <Card className="shadow-sm mt-3">
                <CardHeader>
                    <h3>Update post from here.</h3>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={updatePost}>

                        <FormGroup className="my-3"> 
                            <Label for="title">Post title</Label>
                            <Input 
                            type="text"
                            id="title"
                            placeholder="Blog title"
                            // className="rounded-0"
                            name="title"
                            value={post.title}
                            onChange={(event)=>handleChange(event, 'title')}
                            />
                        </FormGroup>

                        <FormGroup className="my-3"> 
                            <Label for="content">Post Content</Label>
                            {/* <Input 
                            type="textarea"
                            id="content"
                            placeholder="Blog content"
                            // className="rounded-0"
                            style={{height:'300px'}}
                            /> */}
                            <JoditEditor 
                                ref={editor}
                                value={post.content}
                                onChange={newContent => setPost({...post, content:newContent})}
                            />
                        </FormGroup>

                        {/* file field 
                        <div className="mt-3">
                            <label For="banner">Select post banner</label>
                            <Input className="mt-1" id="banner" type="file" onChange={''}/>
                        </div> */}

                        <FormGroup className="my-3"> 
                            <Label for="category">Post Category</Label>
                            <Input 
                            type="select"
                            id="category"
                            placeholder="Blog content"
                            // className="rounded-0"
                            name="categoryId"
                            onChange={(event)=>handleChange(event, 'categoryId')}
                            defaultValue={post.categoryId}
                            >
                                <option disabled value={0}>-- select category --</option>
                                {
                                    categories.map((category) => (
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))
                                }
                            </Input>
                        </FormGroup>

                        <Container className="text-center">
                            <Button type='submit' color="primary">Update Post</Button>
                            <Button className="ms-2" color="danger">Reset Content</Button>
                        </Container>

                    </Form>
                </CardBody>
            </Card>
        </div>
        )
    }

  return (
    <Base>
        <Container>
            {post && updateHtml()}
        </Container>
    </Base>
  )
}

export default UpdateBlog