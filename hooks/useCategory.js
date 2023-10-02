import { useState,useEffect } from "react"
import axios from "axios";

const useCategory = ()=>{

    const [categories,setCategories]=useState([]);
    
    useEffect(()=>{
        fetchCategories();
    },[]);

    const fetchCategories = async ()=>{
        try {
            const {data} =  await axios.get('/categories');
            if(data?.success){
                setCategories(data.categories);
            }
            else{
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {categories};
}

export default useCategory;