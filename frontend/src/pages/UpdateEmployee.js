import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './UpdateEmployee.css'
import Sidebar from '../components/Sidebar'

const UpdateEmployee = () => {
    const { id: employeeId } = useParams()
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: ''
    })

    const [positions, setPositions] = useState([])
    const [selectedPositions, setSelectedPositions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEmployee = async () => {

            const response = await fetch(`http://127.0.0.1:8000/api/employee/${employeeId}/`)
            const data = await response.json()

            const positionsResponse = await fetch(`http://127.0.0.1:8000/api/positions/`)
            const positionsData = await positionsResponse.json()

            setEmployee(data)
            setPositions(positionsData)
            setSelectedPositions(data.workable_positions.map(p => p.id))
        }
        fetchEmployee()
    }, [employeeId])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePositionChange = (positionId) => {
        setSelectedPositions(prev => prev.includes(positionId)
        ? prev.filter(id => id !== positionId)
        : [...prev, positionId]
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch(`http://127.0.0.1:8000/api/employee/${employeeId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...employee,
                workable_positions: selectedPositions
            })
        })

        navigate(`/employee/${employeeId}`)
    }

    return (
        <div className='main-container'>
            <Navbar headerText={"Edit Employee"}/>
            <Sidebar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={employee.first_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Last name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={employee.last_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="position-section">
                    <h3>Position:</h3>
                    {positions.map(position => (
                        <div key={position.id} className="position-item">
                            <input
                            type="checkbox"
                            id={`position-${position.id}`}
                            checked={selectedPositions.includes(position.id)}
                            onChange={() => handlePositionChange(position.id)}
                            />
                            <label htmlFor={`position-${position.id}`}>
                                {position.position_name || `Position ${position.id}`}
                            </label>
                        </div>
                            
                    ))}
                </div>
                <button type="submit">Save</button>
            </form>

        </div>
    )
}

export default UpdateEmployee