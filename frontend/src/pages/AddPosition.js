import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const AddPosition = () => {

    const [position, setPosition] = useState({
        position_name: '',
        description: '',
        required_permissions: []
    })

    const [permissions, setPermissions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPermissions = async () => {
            const  response = await fetch(`http://127.0.0.1:8000/api/permissions/`)
            const data = await response.json()
            setPermissions(data)
        }

        fetchPermissions()
    }, [])

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setPosition(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCheckboxChange = (event) => {
        const permissionId = parseInt(event.target.value)
        setPosition(prev => {
            const updatePermission = prev.required_permissions.includes(permissionId)
            ? prev.required_permissions.filter(pos => pos !== permissionId)
            : [...prev.required_permissions, permissionId]

            return {
                ...prev,
                required_permissions: updatePermission
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch(`http://127.0.0.1:8000/api/positions/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                position_name: position.position_name,
                description: position.description,
                required_permissions: position.required_permissions
            })
        })
        navigate('/positions')
    }

    return (
        <div className='main-container'>
            <Navbar headerText={"New Position"}/>
            <Sidebar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
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
                <div className="permission-checkbox">
                    <h3>Permissions:</h3>
                    {permissions.map(permission => (
                        <div key={permission.id} className="checkbox-item">
                            <input type="checkbox"
                            id={`os-${permission.id}`}
                            value = {permission.id}
                            checked={position.required_permissions.includes(permission.id)}
                            onChange={handleCheckboxChange}
                            />
                            <label htmlFor={`pos-${permission.id}`}>{permission.permission_name}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Add Position</button>
            </form>
        </div>
    )
}

export default AddPosition