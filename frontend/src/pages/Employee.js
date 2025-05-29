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
                <div className='content-wrapper'>
                    <div className='details-list'>
                        <div className='detail-row'>
                            <span>First name</span>
                            <span>{employee?.first_name}</span>
                        </div>

                        <div className='detail-row alternate-bg'>
                            <span>Last name</span>
                            <span>{employee?.last_name}</span>
                        </div>

                        <div className='detail-row'>
                            <span>Positions</span>
                            <span>{employee?.workable_positions?.map(pos => pos.position_name).join(', ')}</span>
                        </div>

                        <div className='detail-row alternate-bg'>
                            <span>Permissions</span>
                            <span>{employee?.employees_permissions?.map(pos => pos.permission_name).join(', ')}</span>
                        </div>
                        <div className='detail-row'>
                            <span>Comments</span>
                            <span>{employee?.comments}</span>
                        </div>
                    </div>

                    <div className='button-container'>
                        <EmployeeUpdateButton/>
                        <DeleteButton deletePath={`http://127.0.0.1:8000/api/employee/${employeeId}/delete`} pathUrl={"/employees"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee