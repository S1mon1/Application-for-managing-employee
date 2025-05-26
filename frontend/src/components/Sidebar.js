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
      </div>
    </aside>
  )
}

export default Sidebar;