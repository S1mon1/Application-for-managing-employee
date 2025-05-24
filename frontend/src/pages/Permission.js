import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PermissionUpdateButton from '../components/PermissionUpdateButton'
import DeleteButton from '../components/DeleteButton'

const Permission = ({}) => {

    const {id: permissionId} = useParams()
    const [permission, setPermission] = useState(null)

    useEffect(() => {
        getPermission()
    }, [permissionId])

    const getPermission = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/permissions/${permissionId}/`)
        const data = await response.json()
        setPermission(data)
    }

    return (
        <div>
            <Navbar headerText={"Permission"}/>
            <Sidebar/>
            <div className="main-container">
                <p>{permission?.permission_name}</p>
                <PermissionUpdateButton/>
                <DeleteButton deletePath={`http://127.0.0.1:8000/api/permissions/${permissionId}/delete/`} pathUrl="/permissions"/>
                
            </div>
        </div>
    )
}

export default Permission