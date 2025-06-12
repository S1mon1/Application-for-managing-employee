import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ListPositions from "../components/ListPositions"
import "./AddEmployeesPosition.css"
import { useNavigate } from "react-router-dom"

const AddEmployeesPosition = () => {

    const [employees, setEmployees] = useState([])
    const [positions, setPositions] = useState([])
    const [employeepositions, setEmployeePositions] = useState([])
    const [selectedAssignments, setSelectedAssignments] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/employee/`)
            const data = await response.json()
            setEmployees(data)
        }

        const fetchPositions = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/positions/`)
            const dataPosition = await response.json()
            setPositions(dataPosition)
        }

        const fetchEmployeePositions = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/employeesposition/`)
            const dataEmployeesPosition = await response.json()
            setEmployeePositions(dataEmployeesPosition)
        }

        fetchEmployees()
        fetchPositions()
        fetchEmployeePositions()
    }, [])

    const handleEmployeeChange = (positionId, employeeId) => {
        setSelectedAssignments(prev => ({
            ...prev,
            [positionId]: employeeId
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        for (const position of employeepositions) {
            await fetch(`http://127.0.0.1:8000/api/employeespositions/delete/${position.id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        const assignments = Object.entries(selectedAssignments).filter(
            ([_, employeeId]) => employeeId !== ""
            ).map(([positionId, employeeId]) => ({
                position: parseInt(positionId),
                assigned_to: parseInt(employeeId)
            }))

            await fetch('http://127.0.0.1:8000/api/employeespositions/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assignments)
            })
        navigate('/employeesposition')
    }


    return (
        <div className="main-container">
            <Navbar headerText={"Add Employees Position"} />
            <Sidebar/>
            <form onSubmit={handleSubmit}>
                <div className="employeesposition">
                    {positions.map((position) => (
                        <div key={position.id} className="position-row">
                            <ListPositions key={position.id} position={position} />
                            <select
                                value={selectedAssignments[position.id] || ""}
                                onChange={(e) => handleEmployeeChange(position.id, e.target.value)}
                            >
                                <option value = "">Choose employee</option>
                                {employees.map((employee) => (
                                    <option
                                        key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.first_name} {employee.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default AddEmployeesPosition