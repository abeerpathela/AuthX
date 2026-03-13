import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
axios.defaults.withCredentials = true;



function Login() {
  const [state, setState] = useState("Log In");
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate=useNavigate();

  const {backendUrl,isLoggedIn,setIsLoggedIn,userData,setUserData,getUserData}=useContext(AppContext);

  const onSubmitHandler = async (e)=>{
    try{
      e.preventDefault();
      if(state == "Sign Up"){
        const {data} = await axios.post(backendUrl + '/api/auth/signUp',{name,email,password}); // send the data to the backend by using the api end points and post request to the endpoit 
        if(data.success){
          setIsLoggedIn(true);
          getUserData();
          navigate('/');
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(backendUrl + '/api/auth/signIn',{email,password}); // send the data to the backend by using the api end points and post request to the endpoit 
        if(data.success){
          setIsLoggedIn(true);
          await getUserData();
          navigate('/');
        }
        else{
          toast.error(data.message);
        }
      }
    }
    catch(e){
      toast.error(e.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">

      {/* Logo */}
      <div className="p-4">
        <img src={logo} alt="logo" className="h-30" onClick={()=> navigate(-1)} />
      </div>

      {/* Form Container */}
      
      <div className="flex justify-center items-center flex-grow text-white">
        <div className="border p-6 rounded-md w-80 shadow-sm">

          <h2 className="text-xl font-semibold mb-1">
            {state === "Sign Up" ? "Create Account" : "Login Account"}
          </h2>

          <p className="text-gray-500 text-sm mb-4">
            {state === "Sign Up" ? "Create your account" : "Login to your account"}
          </p>

          <form className="flex flex-col gap-3">

            {state === "Sign Up" && (
              <input
                type="text"
                placeholder="Full Name"
                className="border p-2 rounded"
                onChange={e => setName(e.target.value)}
                value={name}
              />
            )}

            <input
              type="email"
              placeholder="Email id"
              className="border p-2 rounded"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />

            {state === "Login" && (
              <p className="text-sm text-blue-500 cursor-pointer" onClick={()=> navigate('/reset-password')}>
                Forgot password?
              </p>
            )}


          <p className="text-sm mt-4">
            {state === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}
            <span
              onClick={() =>
                setState(state === "Sign Up" ? "Login" : "Sign Up")
              }
              className="text-blue-500 cursor-pointer ml-1"
            >
              {state === "Sign Up" ? "Login" : "Sign Up"}
            </span>
          </p>
          <button className="flex justify-center items-center text-center bg-blue-600 text-white border-2 rounded-xl px-[38%] py-2"
          onClick={onSubmitHandler}
          >{state}</button>
        </form>
        </div>
      </div>

    </div>
  );
}

export default Login;