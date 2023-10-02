import { useState,useEffect } from "react"
import axios from "axios";
import toast from "react-hot-toast";

const useNumbers = ()=>{

    //state
    const [numbers,setNumbers]=useState({});

    //lifecycle hooks
    useEffect(()=>{
        fetchAnalytics();
    },[]);

    //methods

    const fetchAnalytics = async ()=>{
        try {

            const {data} = await axios.get('/website/analytics');
            if(data.success){
                setNumbers({
                    postCount : data.postCount,
                    commentCount : data.commentCount,
                    userCount : data.userCount,
                    categoryCount : data.categoryCount
                });
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Internal server error, please contact support");
        }
    }

    return {numbers};

}

export default useNumbers;