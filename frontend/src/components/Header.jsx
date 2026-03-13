import React, { useContext } from "react";
import robotWave from "../assets/robotWave.png"
import { FaHandPeace } from "react-icons/fa";
import { AppContext } from "../context/AppContext";


function Header(){
    const {userData}=useContext(AppContext);
    return(
        <div className="text-white items-center flex flex-col space-y-3">
            <img src={robotWave} className="w-[80%] h-80 rounded-4xl"></img>
           <div className="flex text-7xl"> <h1 className="">Hey {userData ? userData.name : 'Developer '}</h1> <FaHandPeace /> </div>
            <h3 className="text-4xl">Welcome to our App!</h3>
            <p className="text-base">lets start with quick signup and login!</p>
            <button className="text-4xl border-2 border-amber-700 py-2 px-10 rounded-4xl bg-red-700">Get Started</button>
        </div>
    )
}

export default Header;