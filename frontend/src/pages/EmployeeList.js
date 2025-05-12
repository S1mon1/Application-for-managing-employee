import React, {useState, useEffect} from 'react'
import ListEmployee from '../components/ListEmployee'
import Navbar from '../components/Navbar'
import './EmployeeList.css'

const EmployeeList = () => {

    let [employees, setEmployees] = useState([])

    useEffect(() =>{
        getEmployees()
    }, [])

    let getEmployees = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/employee/')
        let data = await response.json()
        setEmployees(data)
    }

    return (
        <div>
            <Navbar headerText={"Employee List"}/>
            <div className="employees">
                {employees.map((employee, index) => (
                    <ListEmployee key={index} employee={employee}/>
                ))}
            </div>
        </div>
    )
}

export default EmployeeList