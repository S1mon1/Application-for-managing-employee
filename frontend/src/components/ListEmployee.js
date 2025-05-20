import { Link } from 'react-router-dom'
import './ListEmployee.css'

const ListEmployee = ({employee}) => {
    return(
        <Link to={`/employee/${employee.id}`} className="employeeLink">
            <span className="employeeName">
                {employee.first_name} {employee.last_name}
            </span>
        </Link>
    )
}

export default ListEmployee