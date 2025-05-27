import { Link, useParams } from 'react-router-dom'

const PermissionUpdateButton = () => {
    const { id: permissionId } = useParams()

    return (
        <Link className='button-style' to={`/permissions/${permissionId}/updatePermission`}>
            Edit
        </Link>
    )
}

export default PermissionUpdateButton