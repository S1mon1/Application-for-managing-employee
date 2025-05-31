import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import './App.css';
import EmployeeList from "./pages/EmployeeList"
import Employee from "./pages/Employee"
import UpdateEmployee from "./pages/UpdateEmployee"
import Positions from "./pages/Positions"
import Position from "./pages/Position"
import UpdatePosition from "./pages/UpdatePoisiton"
import Permissions from "./pages/Permissions"
import Permission from "./pages/Permission"
import UpdatePermission from "./pages/UpdatePermission"
import AddEmployee from "./pages/AddEmployee"
import AddPermission from "./pages/AddPermission"
import AddPosition from "./pages/AddPosition"
import EmployeesPosition from "./pages/EmployeesPosition";


function App() {
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Employee/>}/>
          <Route path="/employees" element={<EmployeeList/>}/>
          <Route path="/employee/:id" element={<Employee/>}/>
          <Route path="/employee/:id/updateEmployee" element={<UpdateEmployee/>}/>
          <Route path="/employees/addEmployee" element={<AddEmployee/>}/>

          <Route path="/positions" element={<Positions/>}/>
          <Route path="/positions/:id" element={<Position/>}/>
          <Route path="/positions/:id/updatePosition" element={<UpdatePosition/>}/>
          <Route path="positions/addPosition" element={<AddPosition/>}/>

          <Route path="/permissions" element={<Permissions/>}/>
          <Route path="/permissions/:id" element={<Permission/>}/>
          <Route path="/permissions/:id/updatePermission" element={<UpdatePermission/>}/>
          <Route path="/permissions/addPermission" element={<AddPermission/>}/>

          <Route path="/employeesposition" element={<EmployeesPosition/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
