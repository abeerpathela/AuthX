import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AppContext } from "../context/AppContext";



function Navbar() {
      const navigate=useNavigate();
      const {isLoggedIn}=useContext(AppContext);
      return(
        <div className="flex justify-evenly">
          <img src={logo} style={{height:150,width:200}} className=" border-2 rounded-full"></img>
          {   !isLoggedIn && (
            <button className="text-4xl text-amber-600" onClick={() => navigate('/login')}>Login</button>
            )
          }
        </div>
      )
}

export default Navbar;