import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ListPermission from '../components/ListPermission'

const Permissions = ({}) => {

    const [permissions, setPermissions] = useState([])

    useEffect(() =>{
        getPermissions()
    }, [])

    const getPermissions = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/permissions/`)
        const data = await response.json()
        setPermissions(data)
    }

    return (
        <div>
            <Navbar headerText={"Permission List"}/>
            <Sidebar/>
            <div className="main-container">
                {permissions.map((permission, index) => (
                    <ListPermission key={index} permission={permission}/>
                ))}
            </div>
        </div>
    )
}

export default Permissions