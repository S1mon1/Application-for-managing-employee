import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const AddEmployeesPosition = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/employee/')
        const data = await response.json()
        setEmployees(data)
    }

    return (
        <div>
            <Navbar headerText={"Add Employees Position"}/>
            <Sidebar/>
            <div className="main-container">
                
            </div>
        </div>
    )

}

export default AddEmployeesPosition