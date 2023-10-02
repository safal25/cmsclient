import { useState,useEffect } from "react"
import axios from "axios";

const useLatestPosts = ()=>{

    const [latestPosts,setLatestPosts]=useState([]);
    
    useEffect(()=>{
        fetchPosts();
    },[]);

    const fetchPosts = async ()=>{
        try {
            const {data} =  await axios.get('/posts/get-posts/1');
            if(data?.success){
                setLatestPosts(data.posts);
            }
            else{
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {latestPosts};
}

export default useLatestPosts;