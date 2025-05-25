import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const AddEmployee = () => {

    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        workable_positions: []
    })

    const [positions, setPositions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPositions = async () => {
            const  response = await fetch(`http://127.0.0.1:8000/api/positions/`)
            const data = await response.json()
            setPositions(data)
        }

        fetchPositions()
    }, [])

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

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch(`http://127.0.0.1:8000/api/employees/addEmployee/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: employee.first_name,
                last_name: employee.last_name,
                workable_positions: employee.workable_positions
            })
        })
        navigate('/employees')
    }

    return (
        <div className='main-container'>
            <Navbar headerText={"NewEmployee"}/>
            <Sidebar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
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
                <div className="position-checkbox">
                    <h3>Positions:</h3>
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
                <button type="submit">Add Employee</button>
            </form>
        </div>
    )
}

export default AddEmployee