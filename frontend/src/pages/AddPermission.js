import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const AddPermission = () => {

    const [permission, setPermission] = useState({
        permission_name:'',
        description: '',
        comments: ''
    })

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setPermission(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch(`http://127.0.0.1:8000/api/permissions/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                permission_name: permission.permission_name,
                description: permission.description,
                comments: permission.comments
            })
        })
        navigate('/permissions')
    }

    return (
        <div className='main-container'>
            <Navbar headerText={"New Permission"}/>
            <Sidebar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="permission_name"
                        value={permission.permission_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={permission.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Comments</label>
                    <textarea
                        type="text"
                        name="comments"
                        value={permission.comments}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Add Permission</button>
            </form>
        </div>
    )
}

export default AddPermission