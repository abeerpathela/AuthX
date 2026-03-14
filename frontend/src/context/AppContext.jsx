import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const navigate=useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () =>{
    try{
      const {data} = await axios.post(backendUrl+'/api/auth/is-authenticated',{},{withCredentials: true});
      if(data.success){
        setIsLoggedIn(true);
        getUserData();
      }
    }
    catch(err){
      toast.error(err);
    }
  }

  const logOut = async ()=>{
    try{
      const {data} = await axios.post(backendUrl+'/api/auth/logout');
      if(data.success){
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
      }
    }
    catch(err){
      toast.error(err);
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/data",
        { withCredentials: true }
      );

      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
      } else {
        toast.error(data.message);
      }

    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  const sendVerificationOtp = async () => {
  try {

    const { data } = await axios.post(
      backendUrl + "/api/auth/send-verify-otp",
      {},
      { withCredentials: true }
    );

    if (data.success) {
      toast.success(data.message);
      navigate("/email-verify");
    } else {
      toast.error(data.message);
    }

  } catch (err) {
    toast.error(err.message);
  }
};


  useEffect(() => {
    getUserData(),
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    logOut,
    sendVerificationOtp
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};