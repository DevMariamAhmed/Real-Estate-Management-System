
import {Route, Routes } from "react-router-dom";
import Customer from "./Pages/Customer";
import Dashboard from "./Pages/Dashboard";
import Property from "./Pages/Property";
import Maintainacereq from "./Pages/Maintainacereq";
import Sidenav from "./Components/Sidenav";
import Login from "./Pages/Login";
import Rental from "./Pages/Rentalhomes";
import Employee from "./Pages/Employee";
import Tenants from "./Pages/Tenants";
import Receipts from "./Pages/Receipts";
import Users from "./Pages/Users";
function App() {
  return (
    <Routes>
      <Route path="/customers" element={<Tenants/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/property" element={<Property/>}/>
      <Route path="/maintainance" element={<Maintainacereq/>}/>
      <Route path="/Rental" element={<Rental/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/employee" element={<Employee/>}/>
      <Route path="/receipts" element={<Receipts/>}/>

    </Routes>
    
  );
}

export default App;
