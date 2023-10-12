import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Input, Button } from "reactstrap"
import logo from "../assets/images/HLOGO.png";
import logolightImg from "../assets/images/HLOGO.png";
// import { Link } from 'react-router-dom';
import {AiOutlineLogout, AiOutlineClose} from "react-icons/ai"

export default function Header() {
  const logout = ()=> {
    localStorage.clear()
  }
  return (
   
      <React.Fragment>
        <nav class="navbar " style={{height:"80px", backgroundColor:"#0E4A60",width:"100%", height:"80px",position:"absolute"}}>
  <h1 className='text-white 'style={{marginLeft:"20%"}}>Real Estate Management System</h1>

<Link className='btn btn-outline-primary text-light' to="/"onClick={logout}>  <AiOutlineLogout style={{marginRight: "12px"}} /> Logout </Link> 
</nav>
{/* backgroundColor="#"}}/>
 */}



        
      </React.Fragment>
    )
 
}
