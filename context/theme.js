import {createContext,useState,useEffect} from 'react';


const ThemeContext=createContext();

const ThemeProvider=(props)=>{
    
    const [myTheme,setTheme]=useState('light');

    useEffect(()=>{
        if(localStorage.getItem('theme')){
            setTheme(localStorage.getItem('theme'));
            console.log('theme in themeprovider use effect');
        }
    },[]);

    return (
        <ThemeContext.Provider value={[myTheme,setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export {ThemeContext,ThemeProvider};