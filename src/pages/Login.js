import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";

const Login=()=>{

    const [loginDetails, setLoginDetails] = useState({
        username:'',
        password:''
    });

    const handleChange=(event, field)=>{
        setLoginDetails({...loginDetails, [field]: event.target.value});
    };

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        console.log(loginDetails);
        // validations
        if(loginDetails.username.trim()=='' || loginDetails.password.trim()==''){
            toast.error("username or password required");
            return;
        };

        // calling server API for sending the data
        loginUser(loginDetails).then((data) =>{
            console.log(data);

            // saving data to loacl storage 
            doLogin(data, ()=>{
                console.log("login data is saved to local storage");

                // redirecting user to dashboard 
            });

            toast.success("Login successfull.")
        }).catch(error=>{
            console.log(error);
            if(error.response.status==400 || error.response.status==404){
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong at our end.")
            }
        });
    };

    const handleReset=()=>{
        setLoginDetails({
            username:'',
            password:''
        });
    };

    return(
        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                Fill information to login.
                            </CardHeader>
                            <CardBody>
                                {/* creating form  */}
                                <Form onSubmit={handleFormSubmit}>
                                    {/* username/email field  */}
                                    <FormGroup>
                                    <Label for="email">Enter Username</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Your username"
                                        value={loginDetails.username}
                                        onChange={(event)=>handleChange(event, 'username')}
                                    />
                                    </FormGroup>
                                    <FormGroup>
                                    {/* password field  */}
                                    <Label for="password">Enter Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Your password"
                                        value={loginDetails.password}
                                        onChange={(event)=>handleChange(event, 'password')}
                                    />
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button outline color="light">Login</Button>
                                        <Button onClick={handleReset} className="ms-2" color="secondary" type="reset">Reset</Button>
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

export default Login;