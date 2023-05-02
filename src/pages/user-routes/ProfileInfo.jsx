import React, { useContext, useEffect, useState } from 'react'
import Base from '../../components/Base';
import userContext from'../../context/userContext';
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/user-service';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, Container, Row, Table } from 'reactstrap';
import ViewUserProfile from '../../components/ViewUserProfile';

function ProfileInfo() {

  const {userId} = useParams()
  // console.log(userId)

  const [user, setUser] = useState({
    roles:[]
  })

  const object = useContext(userContext)

  useEffect(()=>{
    getUser(userId).then(data=>{
      console.log(data);
      setUser({...data})
    }).catch(error=>{
      console.log(error);
      toast.error()
    })
  }, [])


  const userView=()=>{
    return(
      <Row>
        <Col md={
          {
            size:6,
            offset:3
          }
        }>
          <ViewUserProfile user={user} />
        </Col>
      </Row>
    )
  }

  return (
    <Base>
      {user ? userView() : "Loading user data"}
    </Base>
  )
}

export default ProfileInfo;