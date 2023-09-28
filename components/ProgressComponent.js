import { Progress } from "antd"
import { useContext } from "react"
import { ThemeContext } from "../context/theme"
import CountUp from "react-countup"
import Link from 'next/link';

const threeColors={
    '0%' : "#666",
    '50%' : "#f8f8ff",
    '100%' : "#fff"
}

const ProgressComponent = ({number,name,link="#"})=>{

    //context
    const [myTheme,setTheme]=useContext(ThemeContext);

    return (
        <Link href={link}>
            <div style={{"textAlign" : "center","fontSize" : 20}}>
                <Progress type="circle" percent={100} 
                        format={()=><CountUp style={{"color" : myTheme==='dark'?"#fff":'#000'}} 
                                            end={number} duration={5} />} 
                        strokeColor={threeColors}
                />
                <p style={{"marginTop" : 5}}>{name.toUpperCase()}</p>
            </div>
        </Link>
    )

}

export default ProgressComponent;