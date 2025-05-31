import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ListEmployeesPosition from "../components/ListEmployeesPosition"

const EmployeesPosition = () => {

    const [employeesposition, setEmployeesPosition] = useState([])

    useEffect(() => {
        getEmployeesPosition()
    }, [])

    const getEmployeesPosition = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/employeesposition/')
        const data = await response.json()
        setEmployeesPosition(data)
    }

    return (
        <div className="main-container">
            <Navbar headerText={"Employees Position"}/>
            <Sidebar/>
            <div className="main-container">
                {employeesposition.map((employeeposition, index) => (
                    <ListEmployeesPosition key={index} employeeposition = {employeeposition}/>
                ))}
            </div>
        </div>
    )
}

export default EmployeesPosition