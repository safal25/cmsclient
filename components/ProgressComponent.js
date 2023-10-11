import { Progress } from "antd"
import { useContext } from "react"
import { ThemeContext } from "../context/theme"
import { AuthContext } from "../context/auth"
import CountUp from "react-countup"
import Link from 'next/link';

const threeColors={
    '0%' : "#666",
    '50%' : "#f8f8ff",
    '100%' : "#fff"
}

const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
};
  

const ProgressComponent = ({number,name,link="#"})=>{

    //context
    const [myTheme,setTheme]=useContext(ThemeContext);
    const [auth,setAuth]=useContext(AuthContext);

    return (
        <Link href={link}>
            <div style={{"textAlign" : "center","fontSize" : 20}}>
                <Progress type="circle" percent={100} 
                        format={()=><CountUp style={{"color" : (myTheme==='dark' || auth.user===null)?"#fff":'#000'}} 
                                            end={number} duration={5} />} 
                        strokeColor={conicColors}
                />
                <p style={{"marginTop" : 5}}>{name.toUpperCase()}</p>
            </div>
        </Link>
    )

}

export default ProgressComponent;