import { createContext,useState } from "react";

const MediaContext=createContext();

const MediaProvider=(props)=>{

    const [media,setMedia]=useState({
        Images : [],
        selected : null,
        showMediaModal : false,
    });


    return (
        <MediaContext.Provider value={{media,setMedia}}>
            {props.children}
        </MediaContext.Provider>
    )


}

export {MediaProvider,MediaContext};

