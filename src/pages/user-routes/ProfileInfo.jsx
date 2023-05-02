import React, { useContext, useEffect, useState } from 'react'
import Base from '../../components/Base';
import userContext from'../../context/userContext';
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/user-service';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, Container, Row, Table } from 'reactstrap';

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
            size:8,
            offset:2
          }
        }>
          <Card className='mt-5 text-center'>
            <CardHeader>
              <h3 className='text-uppercase'>User Information</h3>
            </CardHeader>
            <CardBody>
              <Container >
                <img style={{maxWidth:'200px', maxHeight:'200px'}} src='https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg' alt='User profile picture' className='img-fluid rounded-circle'/>
              </Container>
              <Table bordered={true} className='mt-3'>
                {/* <thead>
                  <tr>

                  </tr>
                </thead> */}

                <tbody>
                  <tr>
                    <td>
                      PROFILE ID
                    </td>
                    <td>
                      PEN-IT@{user.id}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      USER NAME
                    </td>
                    <td>
                      {user.name}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      USER EMAIL
                    </td>
                    <td>
                      {user.email}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      USER ABOUT
                    </td>
                    <td>
                      {user.about}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      USER ROLE
                    </td>
                    <td>
                      {user.roles.map((role)=>{
                        return(
                          <div key={role.id}>{
                              role.name
                            }</div>
                        )
                      })}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
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