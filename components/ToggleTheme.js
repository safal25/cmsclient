import {useContext,useEffect,useRef} from 'react';
import { ThemeContext } from '../context/theme';
import { Switch } from 'antd';
import Head from 'next/head';

const ToggleTheme=()=>{
    const [myTheme,setTheme]=useContext(ThemeContext);

    const switchRef=useRef(null);

    useEffect(()=>{
        if(localStorage.getItem('theme')==='dark'){
            switchRef.current.click();
        }
    },[]);

    const handleThemeChange=()=>{
        if(myTheme==='dark'){
            setTheme('light');
            localStorage.setItem('theme','light');
        }
        else{
            setTheme('dark');
            localStorage.setItem('theme','dark');
        }
    }

    return(
        <div>
        <Head>
            <link rel="stylesheet" href={`http://localhost:3000/css/${myTheme}.css`} />
        </Head>
        <Switch checkedChildren='Dark' unCheckedChildren='Light' onChange={handleThemeChange}  ref={switchRef}/> 
        </div>

    )


}

export default ToggleTheme;