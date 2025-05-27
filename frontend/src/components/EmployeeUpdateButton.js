import { Link, useParams } from 'react-router-dom';
import "./UpdateButton.css"

const EmployeeUpdateButton = () => {
    const { id: employeeId } = useParams();

    return (
        <Link className='button-style' to={`/employee/${employeeId}/updateEmployee`}>
            Edit
        </Link>
    )
}

export default EmployeeUpdateButton;