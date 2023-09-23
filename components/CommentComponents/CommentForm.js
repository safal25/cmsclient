import { useContext,useState } from "react";
import {Input,Button} from "antd";
import { AuthContext } from "../../context/auth";

const {TextArea} = Input;

const CommentForm = ({loading,comment,setComment,handleSubmit})=>{

    //context
    const [auth,setAuth]=useContext(AuthContext);

    return (
        <>
            <TextArea 
                value={comment}
                rows={4} 
                placeholder="Write a comment...." 
                maxLength={200} 
                disabled={auth?.user===null || auth?.token===""}
                onChange={(e)=>{setComment(e.target.value)}}
            />
            <Button loading={loading} style={{marginTop : 4}} type="Primary" disabled={comment===""} onClick={handleSubmit}>
                Post
            </Button>
        </>
    );

}

export default CommentForm;