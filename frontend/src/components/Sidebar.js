import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className='links'>
        <Link to={`/employees/`}>Employees</Link>
        <Link to={`/employees/addEmployee/`} className='addElement'>Add Employee</Link>
        <Link to={`/positions/`}>Positions</Link>
        <Link to={`/positions/addPosition`} className='addElement'>Add Position</Link>
        <Link to={`/permissions/`}>Permissions</Link>
        <Link to={`/permissions/addPermission/`} className='addElement'>Add Permission</Link>
        <Link to={`/employeesposition/`}>Employees Position</Link>
        <Link to={`/employeesposition/AddEmployeesPosition`} className='addElement'>Add Employees Position</Link>
      </div>
    </aside>
  )
}

export default Sidebar;