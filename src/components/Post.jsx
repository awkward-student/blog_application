import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from '../context/userContext'

function Post({post={id:-1, title:"Default post title", content:"default post content"}, deletePost}) {

    const userContextData = useContext(userContext);
    
    const [user, setUser] = useState(null)

    const [login, setLogin] = useState(null)

    useEffect(()=>{
        setUser(getCurrentUserDetail())
        setLogin(isLoggedIn())
        console.log(userContextData)
                        console.log(userContextData.user.login);
    }, [])

    return (
        <Card className='border-0 shadow-sm mt-3'>
            <CardHeader>
                {post.title}
            </CardHeader>
            <CardBody>
                <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,60)+"..."}}>
                    
                </CardText>
                <div>  
                    <Link className='btn btn-secondary border=0' to={'/posts/'+post.postId}>Read More</Link>
                    {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={()=>deletePost(post)} color='danger' className='ms-2'>Delete</Button> : '')}
                    {userContextData.user.login && (user && user.id === post.user.id ? <Button tag={Link} to={'/user/update-blog/'+post.postId} color='warning' className='ms-2'>Update</Button> : '')}
                </div>
            </CardBody>
        </Card>
    )
}

export default Post