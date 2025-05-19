import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className='links'>
        <Link to={`/employees/`}>Employees</Link>
        <Link to={`/positions/`}>Positions</Link>
        <Link to={`/permissions/`}>Permissions</Link>
      </div>
    </aside>
  )
}

export default Sidebar;