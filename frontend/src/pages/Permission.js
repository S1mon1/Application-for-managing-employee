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
                <div className='content-wrapper'>
                    <div className='details-list'>
                        <div className='detail-row'>
                            <span>Permission</span>
                            <span>{permission?.permission_name}</span>
                        </div>
                        <div className='detail-row alternate-bg'>
                            <span>Description</span>
                            <span>{permission?.description}</span>
                        </div>
                        <div className='detail-row'>
                            <span>Comments</span>
                            <span>{permission?.comments}</span>
                        </div>
                    </div>
                </div>
                <PermissionUpdateButton/>
                <DeleteButton deletePath={`http://127.0.0.1:8000/api/permissions/${permissionId}/delete/`} pathUrl="/permissions"/>
                
            </div>
        </div>
    )
}

export default Permission