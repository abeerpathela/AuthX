import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function Home(){
    return(
      <div className="h-screen w-screen bg-black">
        <Navbar/>
        <Header/>
      </div>
    )
}

export default Home;