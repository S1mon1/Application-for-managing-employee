import { useState, useEffect } from "react";


const ListEmployeesPosition = ({employeeposition}) => {
    const [employees, setEmployees] = useState([])
    const [positions, setPositions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const [employeesResponse, positionsResponse] = await Promise.all([
                fetch('http://127.0.0.1:8000/api/employee/'),
                fetch('http://127.0.0.1:8000/api/positions/')
            ])

            const [employeesData, positionsData] = await Promise.all([
                employeesResponse.json(),
                positionsResponse.json()
            ])

            setEmployees(employeesData)
            setPositions(positionsData)
        }
        fetchData()
    }, [])

    const employee = employees.find(e => e.id === employeeposition.assigned_to)
    const position = positions.find(p => p.id === employeeposition.position)

    return (
        <div className="employee-position-item">
            <p>Position: {position?.position_name}</p>
            <p>Employee: {employee?.first_name} {employee?.last_name}</p>
            <p>Assigment date: {employeeposition.start_date}</p>
        </div>
    )
}

export default ListEmployeesPosition
