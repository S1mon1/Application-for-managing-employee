import { Link, useParams } from 'react-router-dom'

const PermissionUpdateButton = () => {
    const { id: permissionId } = useParams()

    return (
        <div>
        <Link to={`/permissions/${permissionId}/updatePermission`}>
            Edytuj
        </Link>
        </div>
    )
}

export default PermissionUpdateButton