import { Link } from 'react-router-dom'
import './ListPermission.css'

const ListPermission = ({permission}) => {
    return(
        <Link to={`/permissions/${permission.id}`} className="permissionLink">
            <span className="permissionName">
                {permission.permission_name}
            </span>
        </Link>
    )
}

export default ListPermission