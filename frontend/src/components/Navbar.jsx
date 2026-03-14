import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AppContext } from "../context/AppContext";
 


function Navbar() {
  const navigate = useNavigate();
  const { userData,logOut,sendVerificationOtp } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between px-8 py-4">

      <img
        src={logo}
        className="h-17 w-40 rounded-full border-2 bg-white"
        alt="logo"
      />

      {userData ? (
        <div className="relative group">

          <div className="flex items-center justify-center h-10 w-10 bg-amber-500 text-white rounded-full text-lg font-semibold cursor-pointer">
            {userData?.name?.[0]?.toUpperCase()}
          </div>

          <div className="absolute right-0 top-10 hidden group-hover:block z-10">
            <ul className="bg-gray-100 text-sm rounded shadow-lg w-28">
              { !userData.isAccountVerified && 
                 ( <li className="py-2 px-3 hover:bg-gray-200 cursor-pointer" onClick={sendVerificationOtp}>Verify</li> )
              } 
              {/* <li className="py-2 px-3 hover:bg-gray-200 cursor-pointer">Email</li> */}
              <li className="py-2 px-3 hover:bg-gray-200 cursor-pointer" onClick={logOut}>LogOut</li>
            </ul>
          </div>

        </div>
      ) : (
        <button
          className="text-xl text-amber-600 font-semibold"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}

    </div>
  );
}

export default Navbar;