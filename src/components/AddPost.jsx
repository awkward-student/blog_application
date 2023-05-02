import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createPost as doCreatePost, uplaodPostImage } from "../services/post-service";
import { getCurrentUserDetail } from "../auth/index";

const AddPost=()=>{

    const editor = useRef(null);

    // const [content, setContent] = useState('');

    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined)

    const [post, setPost] = useState({
        title:'',
        content:'',
        categoryId:''
    });

    const [image, setImage] = useState(null)

    // const config = {
    //     placeholder:"Start typing..."
    // }

    useEffect(
        () => {
            setUser(getCurrentUserDetail())
            loadAllCategories().then((data)=>{
                console.log(data);
                setCategories(data);
            }).catch(error=>{
                console.log(error);
            })
        }, []
    );

    // field changed function
    const fieldChanged=(event)=>{
        // console.log(event);
        setPost({...post, [event.target.name]:event.target.value})
    }

    const contentFieldChanged=(data)=>{
        setPost({...post,'content':data})
    }

    const createPost=(event)=>{
        event.preventDefault();
        if(post.title.trim()===''){
            toast.error("Post title is required.");
            return;
        }
        if(post.content.trim()===''){
            toast.error("Post content is required.");
            return;
        }
        if(post.categoryId===''){
            toast.error("Post category is required.");
            return;
        }    

        // submit form on server
        post['userId'] = user.id

        doCreatePost(post).then((data) => {

            uplaodPostImage(image, data.postId).then((data)=>{
                toast.success("Image uploaded")
            }).catch((error)=>{
                toast.error("Error uploading image");
                console.log(error);
            })

            toast.success("Post published")
            console.log(post)
            console.log(data)
            setPost({
                title:'',
                content:'',
                categoryId: ''
            })
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
        })
    }

    // handling file change event 
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    return(
        <div className="wrapper">
            <Card className="shadow-sm mt-3">
                <CardHeader>
                    <h3>What's going on your mind?</h3>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={createPost}>

                        <FormGroup className="my-3"> 
                            <Label for="title">Post title</Label>
                            <Input 
                            type="text"
                            id="title"
                            placeholder="Blog title"
                            // className="rounded-0"
                            name="title"
                            onChange={fieldChanged}
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
                                onChange={contentFieldChanged}
                            />
                        </FormGroup>

                        {/* file field  */}
                        <div className="mt-3">
                            <label For="banner">Select post banner</label>
                            <Input className="mt-1" id="banner" type="file" onChange={handleFileChange}/>
                        </div>

                        <FormGroup className="my-3"> 
                            <Label for="category">Post Category</Label>
                            <Input 
                            type="select"
                            id="category"
                            placeholder="Blog content"
                            // className="rounded-0"
                            name="categoryId"
                            onChange={fieldChanged}
                            defaultValue={0}
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
                            <Button type='submit' color="primary">Publish Post</Button>
                            <Button className="ms-2" color="danger">Reset Content</Button>
                        </Container>

                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default AddPost;