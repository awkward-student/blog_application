import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";

const Signup=()=>{

    // function setData()
    const [data, setData] = useState({
        name:'',
        email:'',
        password:'',
        about:''
    });

    // function setError()
    const [error, setError] = useState({
        errors:{},
        isError:false
    });


    // handle form data change 
    const handleChange=(event, property)=>{
        // dynamically settin' the values 
        setData({...data, [property]:event.target.value});
    };

    // submit+ing form data 
    const submitForm=(event)=>{
        // preventing reload on submit
        event.preventDefault();

        // client side data validation 

        // calling server API for sending the data
        signUp(data).then((resp) => {
            console.log(resp);
            console.log('Success log');
            toast.success("User registered successfully.");
            resetData();
        }).catch((error) => {
            console.log(error);
            console.log('Error');
        });
    };

    // reset+ing form data 
    const resetData=()=>{
        setData({
            name:'',
            email:'',
            password:'',
            about:''
        });
    };
    
    // testing handleChange() 
    // useEffect(()=>{
        // // testing data object values on console
        // console.log(data);
    // }, data)


    return(
        <Base>
        {/* { JSON.stringify(data) } testing data object values on ui */}
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                Fill information to Register.
                            </CardHeader>
                            <CardBody>
                                {/* creating form  */}
                                <Form onSubmit={submitForm}> 
                                    {/* name field  */}
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Your name here."
                                            onChange={(event)=>handleChange(event, 'name')}
                                            value={data.name}
                                        />
                                    </FormGroup>
                                    {/* email field  */}
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="example@mail.com"
                                            onChange={(event)=>handleChange(event, 'email')}
                                            value={data.email}
                                        />
                                    </FormGroup>
                                    {/* password field  */}
                                    <FormGroup>
                                        <Label for="password">Create Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Create Password."
                                            onChange={(event)=>handleChange(event, 'password')}
                                            value={data.password}
                                        />
                                    </FormGroup>
                                    {/* about field  */}
                                    <FormGroup>
                                        <Label for="about">Tell us about you</Label>
                                        <Input
                                            id="about"
                                            type="textarea"
                                            placeholder="..."
                                            style={{height:"250px"}}
                                            onChange={(event)=>handleChange(event, 'about')}
                                            value={data.about}
                                        />
                                    </FormGroup>
                                    {/* submit button  */}
                                    <Container className="text-center">
                                        <Button outline color="light">
                                            Register
                                        </Button>
                                        <Button onClick={resetData} color="secondary" className="ms-2" type="reset">
                                            Reset
                                        </Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default Signup;