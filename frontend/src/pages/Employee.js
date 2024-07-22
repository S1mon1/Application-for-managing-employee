import React, {useState, useEffect} from 'react'

const Employee = () => {

    let [employee, setEmployee] = useState([])

    useEffect(() => {
        getEmployee()
    }, [])

    let getEmployee = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/employee')
        let data = await response.json()
        console.log('DATA', data)
        setEmployee(data)
    }

    return (
        <div>
            User details
        </div>
    )
}

export default Employee