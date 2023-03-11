import {createContext,useState} from 'react';


const PostContext=createContext();

const PostProvider=(props)=>{
    
    const [posts,setPosts]=useState([]);
    const [categories,setCategories]=useState([]);


    return (
        <PostContext.Provider value={{posts,categories,setPosts,setCategories}}>
            {props.children}
        </PostContext.Provider>
    );
}

export {PostContext,PostProvider};