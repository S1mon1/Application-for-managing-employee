import {useState, useEffect, useCallback} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const UpdatePermission = () => {
    const { id: permissionId } = useParams()
    const [permission, setPermission] = useState({
        permission_name: ''
    })
    const navigate = useNavigate()

    const getPermission = useCallback (async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/permissions/${permissionId}/`)
        const data = await response.json()
        setPermission(data)
    }, [permissionId])

    useEffect(() => {
        getPermission()
    }, [permissionId, getPermission])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setPermission(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch (`http://127.0.0.1:8000/api/permissions/${permissionId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(permission)
        })
        navigate(`/permissions/${permissionId}`)
    }

    return (
        <div className='main-container'>
            <Navbar headerText={"Edit Permission"}/>
            <Sidebar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Uprawnienie:</label>
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
                <button type="submit">Save</button>
            </form>

        </div>
    )
}

export default UpdatePermission