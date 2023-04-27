import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";

const Login=()=>{
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
                                <Form>
                                    {/* username/email field  */}
                                    <FormGroup>
                                    <Label for="email">Enter Username</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Your username"
                                    />
                                    </FormGroup>
                                    <FormGroup>
                                    {/* password field  */}
                                    <Label for="password">Enter Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Your "
                                    />
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button outline color="light">Login</Button>
                                        <Button className="ms-2" color="secondary" type="reset">Reset</Button>
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