import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import EmployeeUpdateButton from '../components/EmployeeUpdateButton'
import Navbar from '../components/Navbar'
import './Employee.css'
import Sidebar from '../components/Sidebar'
import DeleteButton from '../components/DeleteButton'

const Employee = ({match}) => {

    const {id: employeeId} = useParams()
    const [employee, setEmployee] = useState(null)


    useEffect(() => {
        getEmployeee()
    }, [employeeId])

    const getEmployeee = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/employee/${employeeId}/`)
        const data = await response.json()
        setEmployee(data)
    }

    return (
        <div>
            <Navbar headerText={"Employee"}/>
            <Sidebar/>
            <div className="main-container">
                <p>{employee?.first_name}</p>
                <p>{employee?.last_name}</p>
                <p>{employee?.workable_positions?.map(pos => pos.position_name).join(', ')}</p>
                <EmployeeUpdateButton/>
                <DeleteButton deletePath={`http://127.0.0.1:8000/api/employee/${employeeId}/delete`} pathUrl="/employees"/>
            </div>
        </div>
    )
}

export default Employee