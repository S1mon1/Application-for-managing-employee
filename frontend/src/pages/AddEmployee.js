import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import "./AddEmployee.css"

const AddEmployee = () => {

    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        workable_positions: [],
        employees_permissions: [],
        comments: ''
    })

    const [errors, setErrors] = useState({})
    const [positions, setPositions] = useState([])
    const [permissions, setPermissions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPositions = async () => {
            const  response = await fetch(`http://127.0.0.1:8000/api/positions/`)
            const data = await response.json()
            setPositions(data)
        }
        const fetchPermissions = async () => {
            const responsePermission = await fetch(`http://127.0.0.1:8000/api/permissions/`)
            const dataPermission = await responsePermission.json()
            setPermissions(dataPermission)
        }

        fetchPositions()
        fetchPermissions()
    }, [], [])

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCheckboxChange = (event) => {
        const positionId = parseInt(event.target.value)
        setEmployee(prev => {
            const updatePositions = prev.workable_positions.includes(positionId)
            ? prev.workable_positions.filter(pos => pos !== positionId)
            : [...prev.workable_positions, positionId]

            return {
                ...prev,
                workable_positions: updatePositions
            }
        })
    }

    const handleCheckboxChangePermission = (event) => {
        const permissionId = parseInt(event.target.value)
        setEmployee(prev => {
            const updatePermission = prev.employees_permissions.includes(permissionId)
            ? prev.employees_permissions.filter(pos => pos !== permissionId)
            : [...prev.employees_permissions, permissionId]

            return {
                ...prev,
                employees_permissions: updatePermission
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newErrors = {}
        if (!employee.first_name.trim()) {
          newErrors.first_name = true
        }
        if (!employee.last_name.trim()) {
          newErrors.last_name = true
        }
        
        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
          return
        }

        await fetch(`http://127.0.0.1:8000/api/employees/addEmployee/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: employee.first_name,
                last_name: employee.last_name,
                workable_positions: employee.workable_positions,
                employees_permissions: employee.employees_permissions,
                comments: employee.comments
            })
        })
        navigate('/employees')
    }

    return (
        <div className='main-container'>
            <Navbar headerText={"New Employee"}/>
            <Sidebar/>
            <form onSubmit={handleSubmit}>
                <div className={`input-container ${errors.first_name ? 'error' : ''}`}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={employee.first_name}
                        onChange={handleInputChange}
                    />
                    {errors.first_name && (
                      <span className='error-message'>This field is required</span>
                    )}
                </div>
                <div className={`input-container ${errors.last_name ? 'error' : ''}`}>
                    <label>Last name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={employee.last_name}
                        onChange={handleInputChange}
                    />
                    {errors.last_name && (
                      <span className='error-message'>This field is required</span>
                    )}
                </div>
                <div className="positions-section">
                    <h3>Positions:</h3>
                    <div className="position-checkbox">
                    {positions.map(position => (
                        <div key={position.id} className="checkbox-item">
                            <input type="checkbox"
                            id={`os-${position.id}`}
                            value = {position.id}
                            checked={employee.workable_positions.includes(position.id)}
                            onChange={handleCheckboxChange}
                            />
                            <label htmlFor={`pos-${position.id}`}>{position.position_name}</label>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="permissions-section">
                    <h3>Permissions:</h3>
                    <div className="permission-checkbox">
                    {permissions.map(permission => (
                        <div key={permission.id} className="checkbox-item">
                            <input type="checkbox"
                            id={`os-${permission.id}`}
                            value = {permission.id}
                            checked={employee.employees_permissions.includes(permission.id)}
                            onChange={handleCheckboxChangePermission}
                            />
                            <label htmlFor={`pos-${permission.id}`}>{permission.permission_name}</label>
                        </div>
                    ))}
                    </div>
                </div>
                <div className='input-container-comments'>
                    <label>Comments</label>
                    <textarea
                        type="text"
                        name="comments"
                        value={employee.comments}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    )
}

export default AddEmployee