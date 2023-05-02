import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { Link } from 'react-router-dom'

function CategorySideMenu() {

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        loadAllCategories().then((data)=>{
            console.log(data);
            setCategories([...data]);
        }).catch((error)=>{
            console.log(error);
            toast.error("Error loading ctegories")
        })
    }, [])

  return (
    <div>
        <ListGroup>
            <ListGroupItem tag={Link} to="/" action={true} className='border-1'>
                All Blogs
            </ListGroupItem>
            {
                categories && categories.map((cat, index)=>{
                    return(
                        <ListGroupItem tag={Link} to={'/categories/'+cat.categoryId} className='border-1 mt-1' key={index} cation={true}>
                            {cat.categoryTitle}
                        </ListGroupItem>
                    )
                })
            }
        </ListGroup>
    </div>
  )
}

export default CategorySideMenu