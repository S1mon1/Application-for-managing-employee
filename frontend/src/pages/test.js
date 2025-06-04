import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ListPositions from '../components/ListPositions';
import "./AddEmployeesPosition.css";
import { useNavigate } from "react-router-dom";

const AddEmployeesPosition = () => {

    const [employees, setEmployees] = useState([]);
    const [positions, setPositions] = useState([]);
    const [selectedAssignments, setSelectedAssignments] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
    const fetchData = async () => {
        try {
            const [employeesResponse, positionsResponse] = await Promise.all([
                fetch('http://127.0.0.1:8000/api/employee/'),
                fetch('http://127.0.0.1:8000/api/positions/')
            ]);
            
            const [employeesData, positionsData] = await Promise.all([
                employeesResponse.json(),
                positionsResponse.json()
            ]);
            
            setEmployees(employeesData);
            setPositions(positionsData);
            
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
    };

    fetchData();
}, []);

    const handleEmployeeChange = (positionId, employeeId) => {
        setSelectedAssignments(prev => ({
            ...prev,
            [positionId]: employeeId
        }));
    };

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const assignments = Object.entries(selectedAssignments).filter(
            ([_, employeeId]) => employeeId !== ""
        ).map(([positionId, employeeId]) => ({
            position: parseInt(positionId),
            assigned_to: parseInt(employeeId),
            start_date: new Date().toISOString().split('T')[0]
        }));

        const response = await fetch('http://127.0.0.1:8000/api/employeespositions/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assignments)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Błąd ${response.status}: ${errorData?.detail || 'Nieznany błąd'}`);
        }

        navigate('/employeesposition')
    } catch (error) {
        console.error('Pełny błąd:', error);
        console.error('Stack trace:', error.stack);
        alert(error.message);
    }
};


return (
    <div className="main-container">
        <Navbar headerText={"Add Employees Position"} />
        <Sidebar />
        <form onSubmit={handleSubmit}>
            <div className="employeesposition">
                {positions.map((position, index) => (
                    <div key={position.id} className="position-row">
                        <ListPositions 
                            key={position.id} 
                            positions={positions}
                            employees={employees}
                        />
                        <select
                            value={selectedAssignments[position.id] || ""}
                            onChange={(e) => handleEmployeeChange(position.id, e.target.value)}
                        >
                            <option value="">Choose employee</option>
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
);
};

export default AddEmployeesPosition;