import React from 'react'
import { Button, Card, CardBody, CardHeader, CardText } from 'reactstrap'

function Post({post={title:"Default post title", content:"default post content"}}) {
    return (
        <Card className='border-0 shadow-sm mt-3'>
            <CardHeader>
                {post.title}
            </CardHeader>
            <CardBody>
                <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,60)+"..."}}>
                    
                </CardText>
                <div>  
                    <Button>Read More</Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default Post