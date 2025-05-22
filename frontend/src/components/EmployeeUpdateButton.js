import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const EmployeeUpdateButton = () => {
    const { id: employeeId } = useParams();

    return (
        <Link to={`/employee/${employeeId}/updateEmployee`}>
            Edytuj
        </Link>
    );
};

export default EmployeeUpdateButton;