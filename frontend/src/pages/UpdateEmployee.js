import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
    const { id: employeeId } = useParams();
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: ''
    });
    const navigate = useNavigate();

    const getEmployee = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/employee/${employeeId}/`);
        const data = await response.json();
        setEmployee(data);
    };

    useEffect(() => {
        getEmployee();
    }, [employeeId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(`http://127.0.0.1:8000/api/employee/${employeeId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });
        navigate('/employees');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Imię:</label>
                <input
                    type="text"
                    name="first_name"
                    value={employee.first_name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Nazwisko:</label>
                <input
                    type="text"
                    name="last_name"
                    value={employee.last_name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit">Zapisz zmiany</button>
        </form>
    );
};

export default UpdateEmployee;