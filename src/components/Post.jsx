import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardText } from 'reactstrap'

function Post({post={ title:"Default post title", content:"default post content"}}) {
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
                </div>
            </CardBody>
        </Card>
    )
}

export default Post