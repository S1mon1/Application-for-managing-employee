import './ListPermission.css'

const ListPermission = ({permission}) => {
    return(
        <span className="permission">
            <h3>{permission.permission_name}</h3>
        </span>
    )
}

export default ListPermission