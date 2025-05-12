import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const UpdateButton = () => {
    const [employee, setEmployee] = useState(null);
    const { id: employeeId } = useParams();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/employee/${employeeId}`);
                const data = await response.json();
                setEmployee(data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };
        fetchEmployee();
    }, [employeeId]);

    if (!employee) return null;

    return (
        <Link to={`/employee/${employee.id}/updateEmployee`}>
            Edytuj
        </Link>
    );
};

export default UpdateButton;