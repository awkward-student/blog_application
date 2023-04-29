import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";

const AddPost=()=>{

    const editor = useRef(null);

    const [content, setContent] = useState('');

    const [categories, setCategories] = useState([]);

    const config = {
        placeholder:"Start typing..."
    }

    useEffect(
        () => {
            loadAllCategories().then((data)=>{
                console.log(data);
                setCategories(data);
            }).catch(error=>{
                console.log(error);
            })
        }, []
    );

    return(
        <div className="wrapper">
            <Card className="shadow-sm mt-3">
                <CardHeader>
                    <h3>What's going on your mind?</h3>
                </CardHeader>
                <CardBody>
                    <Form>

                        <FormGroup className="my-3"> 
                            <Label for="title">Post title</Label>
                            <Input 
                            type="text"
                            id="title"
                            placeholder="Blog title"
                            // className="rounded-0"
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
                                value={content}
                                config={config}
                                onChange={newContent => setContent(newContent)}
                            />
                        </FormGroup>

                        <FormGroup className="my-3"> 
                            <Label for="category">Post Category</Label>
                            <Input 
                            type="select"
                            id="category"
                            placeholder="Blog content"
                            // className="rounded-0"
                            >
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
                            <Button color="primary">Publish Post</Button>
                            <Button className="ms-2" color="danger">Reset Content</Button>
                        </Container>

                    </Form>
                    {content}
                </CardBody>
            </Card>
        </div>
    );
};

export default AddPost;