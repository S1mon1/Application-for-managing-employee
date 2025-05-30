import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const UpdatePosition = () => {
    const { id: positionId } = useParams()
    const [position, setPosition] = useState({
        position_name: '',
        description: ''
    })

    const [permissions, setPermissions] = useState([])
    const [selectedPermissions, setSelectedPermissions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPositions = async () => {

            const response = await fetch(`http://127.0.0.1:8000/api/positions/${positionId}/`)
            const data = await response.json()

            const permissionsResponse = await fetch(`http://127.0.0.1:8000/api/permissions/`)
            const permissionsData = await permissionsResponse.json()

            setPosition(data)
            setPermissions(permissionsData)
            setSelectedPermissions(data.required_permissions.map(p => p.id))
        }
        fetchPositions()
    }, [positionId])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setPosition(prev => ({
            ...prev, [name]: value
        }))
    }

    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions(prev => prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch (`http://127.0.0.1:8000/api/positions/${positionId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...position,
                required_permissions: selectedPermissions
            })
        })

        navigate(`/positions/${positionId}`)
    }

    return (
        <div className='main-container'>
            <Navbar headerText={"Edit Position"}/>
            <Sidebar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position_name"
                        value={position.position_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={position.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="permissions-section">
                    <h3>Permissions:</h3>
                    <div className="permission-checkbox">
                    {permissions.map(permission => (
                        <div key={permission.id} className='checkbox-item'>
                            <input
                            type="checkbox"
                            id={`permission-${permission.id}`}
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => handlePermissionChange(permission.id)}
                            />
                            <label htmlFor={`permission-${permission.id}`}>
                                {permission.permission_name || `Permission ${permission.id}`}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>
                <div className='input-container-comments'>
                    <label>Comments</label>
                    <textarea
                        type="text"
                        name="comments"
                        value={position.comments}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>

        </div>
    )
}

export default UpdatePosition