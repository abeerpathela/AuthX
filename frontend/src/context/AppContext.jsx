import { createContext, useState} from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";



export const AppContext = createContext();

export const AppContextProvider = (props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [userData,setUserData]=useState('');

    const getUserData = async ()=>{
        try{
            const {data} = await axios.get(backendUrl+'api/user/data');
            data.success ? setUserData(data.userData) : toast.error(data.message)
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const value={
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}