import { useEffect,createContext,useState } from "react";
import axios from "axios";


const AuthContext=createContext();


const AuthProvider=(props)=>{

    const [auth,setAuth]=useState({
        token : "",
        user : null
    });

    //config axios

    if(process.browser){
        axios.defaults.baseURL=process.env.NEXT_PUBLIC_API;
        axios.defaults.headers.common["Authorization"]=`Bearer ${auth?.token}`;
    }
    else{
        axios.defaults.baseURL=process.env.API;
        axios.defaults.headers.common["Authorization"]=`Bearer ${auth?.token}`;
    }
    
    useEffect(()=>{
        if(localStorage.getItem("auth")){
            setAuth(JSON.parse(localStorage.getItem("auth")));
        }
    },[]);

    return (
        <AuthContext.Provider value={[auth,setAuth]} >
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext,AuthProvider};

