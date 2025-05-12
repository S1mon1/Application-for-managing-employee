import react from 'react';
import './Navbar.css';

const Navbar = ({ headerText }) => {
  return (
    <nav className="navbar">
      <h1>{headerText}</h1>
    </nav>
  );
};

export default Navbar;