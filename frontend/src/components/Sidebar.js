import { useState} from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { Auth } from '../Auth'

const Sidebar = () => {
    const [isActive, setIsActive] = useState(false)
    const {isLoggedIn, logout} = Auth()
    
    const handleHamburgerClick = () => {
        setIsActive(!isActive)
    }

    const handleCloseSidebar = (e) => {
        if (e.target.classList. contains('overlay')) {
            setIsActive(false)
        }
    }

  return (
    <div>
        <button
            className='hamburger-button'
            onClick={handleHamburgerClick}
            aria-label="Toggle sidebar"
        >
            ☰
        </button>
        <div
        className={`overlay ${isActive ? 'active' : ''}`}
        onClick={(e) => handleCloseSidebar(e)}>
        </div>
        <aside className={`sidebar ${isActive ? 'hamburger-active' : ''}`}>
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
        <div className='logoutButton'>
            {isLoggedIn ? (
                <button onClick={logout}>Logout</button>
            ):(<></>)}
        </div>
        </aside>
    </div>
  )
}

export default Sidebar;