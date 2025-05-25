import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const AddEmployee = () => {

    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: ''
    })

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch(`http://127.0.0.1:8000/api/employees/addEmployee/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
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
                    <label>Surname:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={employee.last_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    )
}

export default AddEmployee