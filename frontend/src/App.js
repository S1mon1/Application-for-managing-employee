import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import EmployeeList from "./pages/EmployeeList";

import Employee from './pages/Employee'
import Navbar from './components/Navbar'
import './App.css';
import UpdateEmployee from "./pages/UpdateEmployee";
import Positions from "./pages/Positions";
import Position from "./pages/Position";

function App() {
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Employee/>}/>
          <Route path="/employees" element={<EmployeeList/>}/>
          <Route path="/employee/:id" element={<Employee/>}/>
          <Route path="/employee/:id/updateEmployee" element={<UpdateEmployee/>}/>
          <Route path="/positions" element={<Positions/>}/>
          <Route path="/positions/:id" element={<Position/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
