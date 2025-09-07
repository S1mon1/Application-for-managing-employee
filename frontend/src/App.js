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
import EmployeesPosition from "./pages/EmployeesPosition"
import AddEmployeesPosition from "./pages/AddEmployeesPosition";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import LoginRoute from "./components/LoginRoute";
import { AuthProvider } from "./components/LoginRoute";


function App() {

  return (

    <Router>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginRoute routes={<Employee/>}/>}/>
            <Route path="/employees" element={<LoginRoute routes={<EmployeeList/>}/>}/>
            <Route path="/employee/:id" element={<LoginRoute routes={<Employee/>}/>}/>
            <Route path="/employee/:id/updateEmployee" element={<LoginRoute routes={<UpdateEmployee/>}/>}/>
            <Route path="/employees/addEmployee" element={<LoginRoute routes={<AddEmployee/>}/>}/>

            <Route path="/positions" element={<LoginRoute routes={<Positions/>}/>}/>
            <Route path="/positions/:id" element={<LoginRoute routes={<Position/>}/>}/>
            <Route path="/positions/:id/updatePosition" element={<LoginRoute routes={<UpdatePosition/>}/>}/>
            <Route path="/positions/addPosition" element={<LoginRoute routes={<AddPosition/>}/>}/>

            <Route path="/permissions" element={<LoginRoute routes={<Permissions/>}/>}/>
            <Route path="/permissions/:id" element={<LoginRoute routes={<Permission/>}/>}/>
            <Route path="/permissions/:id/updatePermission" element={<LoginRoute routes={<UpdatePermission/>}/>}/>
            <Route path="/permissions/addPermission" element={<LoginRoute routes={<AddPermission/>}/>}/>

            <Route path="/employeesposition" element={<LoginRoute routes={<EmployeesPosition/>}/>}/>
            <Route path="/employeesposition/addEmployeesPosition" element={<LoginRoute routes={<AddEmployeesPosition/>}/>}/>
          </Routes>
        </AuthProvider>
          <Routes>
            <Route path="/register" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
