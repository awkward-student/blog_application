import React, { useEffect, useState } from 'react'
import userContext from './userContext'

function UserProvider({children}) {

    const [user, setUser] = useState({
        name: 'Vishwas'
    })

    useEffect(()=>{
        setUser({
            name: 'Vishwas Karode'
        })
    }, [])

    return (
    
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>

    )
}

export default UserProvider