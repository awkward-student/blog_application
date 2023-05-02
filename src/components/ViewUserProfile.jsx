import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Container, Table } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn} from '../auth';

const ViewUserProfile = ({user}) => {

    const [currentUser, setCurrentUser] = useState(null)

    const [login, setLogin] = useState(false)

    useEffect(()=>{
        setCurrentUser(getCurrentUserDetail());
        setLogin(isLoggedIn());
    }, [])

  return (
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
                      {/* {currentUser ? (currentUser.id==user.id ? (<CardFooter>
                         <Button color='warning'>Update Profile</Button>
                     </CardFooter>):""): ''} */}
          </Card>
  )
}

export default ViewUserProfile