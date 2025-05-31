

const ListEmployeesPosition = ({employeeposition}) => {
    return (
        <span>
            <p>{employeeposition?.position?.position_name}</p>
            <p>{employeeposition?.assigned_to?.first_name}</p>
        </span>
    )
}

export default ListEmployeesPosition