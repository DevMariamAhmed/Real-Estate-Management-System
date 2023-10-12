import { NavLink, Link } from "react-router-dom"
import {MdOutlineDashboard, MdSubject, MdMenu, MdPersonAddAlt1} from "react-icons/md"
import {BsPersonFill} from "react-icons/bs"
import {FaChalkboardTeacher} from "react-icons/fa"
import {SiGoogleclassroom} from "react-icons/si"
import {AiOutlineLogout, AiOutlineClose} from "react-icons/ai"
import { useState } from "react"
import {ImMenu} from "react-icons/im"
import {MdAttachMoney} from "react-icons/md"

function Sidenav(){

    const [isOpen, setIsOpen] = useState(false);


  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

    return <div> 
    <div className="sidenav" style={{ width: isOpen === true ? "34px" : "" }} > 
  <h1 style={{color:"#E1DDDB",textAlign:"center"}}>REM</h1>
    <button
      onClick={handleIsOpen}
      style={{
        marginLeft: isOpen === true ? "1px" : "",
        display: isOpen === false ? "block" : "none",
      }}
    >
      <AiOutlineClose size="20px" color="black" />
    </button>

    <button
      onClick={handleIsOpen}
      style={{
        marginLeft: isOpen === true ? "1px" : "",
        display: isOpen === true ? "block" : "none",
      }}
    >
      <ImMenu color="black" size="20px" />{" "}
    </button>

    <ul>
       <li> <NavLink to="/dashboard">  <MdOutlineDashboard style={{marginRight: "12px"}}/>Dashboard</NavLink></li>
            <li><NavLink to="/property"> <BsPersonFill style={{marginRight: "12px"}} /> Rental Homes</NavLink></li>
            <li><NavLink to="/Rental"> <BsPersonFill style={{marginRight: "12px"}} /> Selling Homes</NavLink></li>
            <li><NavLink to="/customers"> <FaChalkboardTeacher style={{marginRight: "12px"}}/> Customers </NavLink></li>
            <li><NavLink to="/employee"> <MdPersonAddAlt1 style={{marginRight: "12px"}} /> Employees </NavLink></li>
            <li><NavLink to="/maintainance">  <SiGoogleclassroom style={{marginRight: "12px"}} /> Maintainance Req </NavLink></li>
            <li><NavLink to="/users"> < MdSubject style={{marginRight: "12px"}} /> Users </NavLink> </li>
            <li><NavLink to="/receipts"> <MdAttachMoney/>  Receipts </NavLink></li>



    </ul>

    </div>

    {/* <div className="main">
    </div> */}

    </div>

}

export default Sidenav;
