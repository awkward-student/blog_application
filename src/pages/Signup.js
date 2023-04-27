import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";

const Signup=()=>{
    return(
        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                Fill information to Register.
                            </CardHeader>
                            <CardBody>
                                {/* creating form  */}
                                <Form>
                                    {/* name field  */}
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Your name here."
                                        />
                                    </FormGroup>
                                    {/* email field  */}
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="example@mail.com"
                                        />
                                    </FormGroup>
                                    {/* password field  */}
                                    <FormGroup>
                                        <Label for="password">Create Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Create Password."
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
                                        />
                                    </FormGroup>
                                    {/* submit button  */}
                                    <Container className="text-center">
                                        <Button outline color="light">
                                            Register
                                        </Button>
                                        <Button color="secondary" className="ms-2" type="reset">
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