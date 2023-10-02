import axios from "axios";
import { useEffect,useState} from "react";

const useHome=()=>{

    //states
    const [title,setTitle]=useState("");
    const [subTitle,setSubTitle]=useState("");
    const [fullWidthImage,setFullWidthImage]=useState();

    useEffect(()=>{
        fetchHome();
    },[])

    async function fetchHome(){
        try {

            const {data} = await axios.get("/website/get-page/home");
            if(data?.success){
                setTitle(data.site.title);
                setSubTitle(data.site.subTitle);
                setFullWidthImage(data.site.featuredImage);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return {title,subTitle,fullWidthImage,setTitle,setSubTitle};

}

export default useHome;