import React from 'react';
import { Link } from 'react-router-dom';
import './ListEmployee.css';

const ListEmployee = ({ employee, index }) => {
    const baseClass = index % 2 === 0 ? 'base-even' : 'base-odd';
    
    return(
        <Link 
            to={`/employee/${employee.id}`}
            className={`employee-link ${baseClass}`}
        >
            <span className="name-container">
                <span className="first-name">{employee.first_name}</span>
                <span className="last-name">{employee.last_name}</span>
            </span>
        </Link>
    )
}

export default ListEmployee;