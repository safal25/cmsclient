
import Link from "next/link";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useContext } from "react"
import { AuthContext } from "../../context/auth"

const FullWidthImage = ({title="CMS",subTitle="Content Management System",url="images/CoverPhoto.jpg"})=>{

    //context
    const [auth,setAuth]=useContext(AuthContext);

    return(
        <>
        <img src={url}
             alt='CMS'
             style={{
                width : "100%",
                height : "500px",
                overflow : "hidden",
                objectFit : "cover",
                
             }} 
        />
        <div style={{textAlign : "center", 
                     marginTop : "-420px",
                     textShadow : "2px 2px 4px #000000",
                     }}>
            <h1 style={{fontSize : "75px"}}>{title}</h1>
            <div style={{fontSize : "18px"}}><p>{subTitle}</p></div>
            <Link href={auth.user===null?'/Signin':`/${auth.user.role.toLowerCase()}`}>
               <Button type='primary' icon={<SendOutlined spin={true} />}> Explore </Button>
            </Link>
        </div>
        </>
    )
}

export default FullWidthImage;