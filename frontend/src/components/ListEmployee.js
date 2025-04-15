import React from 'react'
import { Link } from 'react-router-dom'

const ListEmployee = ({employee}) => {
    return(
        <Link to={`/employee/${employee.id}`}>
            <h3>{employee.first_name}</h3>
            <h3>{employee.last_name}</h3>
        </Link>
    )
}

export default ListEmployee