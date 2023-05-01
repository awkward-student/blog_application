import React from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import NewFeed from "../../components/NewFeed";

const dashboard=()=>{
    return(
        <Base>
            <Container>
                <AddPost />
            </Container>
        </Base>
    )
}

export default dashboard;
