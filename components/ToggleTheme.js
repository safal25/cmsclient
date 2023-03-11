import {useContext,useEffect} from 'react';
import { ThemeContext } from '../context/theme';
import { Switch } from 'antd';
import Head from 'next/head';

const ToggleTheme=()=>{
    const [myTheme,setTheme]=useContext(ThemeContext);

    /*useEffect(()=>{
        if(localStorage.getItem('theme')==='dark'){
            switchRef.current.click();
        }
    },[]);*/

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
            <link
  rel="stylesheet"
  href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
/>
        </Head>
        {myTheme==="light"?<Switch checkedChildren='Dark' unCheckedChildren='Light' onChange={handleThemeChange}  /> : <Switch checkedChildren='Dark' unCheckedChildren='Light' onChange={handleThemeChange} defaultChecked /> }
        </div>

    )


}

export default ToggleTheme;