import React, {useState, useEffect} from 'react'

const Employee = () => {

    let [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployees()
    }, [])

    let getEmployees = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/employee/')
        let data = await response.json()
        console.log('DATA', data)
        setEmployees(data)
    }

    return (
        <div>
            User details
            <div className="employees">
                {employees.map((employee, index) => (
                    <h3 key={index}>{employee.first_name}</h3>
                ))}
            </div>
            
        </div>
    )
}

export default Employee