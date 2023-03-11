import AdminLayout from "../../../components/layouts/AdminLayout";
//import TextEditor from "../../../components/TextEditor";
import { Row,Col,Button,Input,Select } from "antd";
import React, { useState, useRef,useContext,useEffect} from 'react';
import {ThemeContext} from "../../../context/theme";
import {AuthContext} from "../../../context/auth";
import { EditOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const JoditEditor=dynamic(()=> import('jodit-react'),{ssr : false,});

const newpost=()=>{
    //States
    const [content, setContent] = useState('');
    const [title,setTitle]=useState('');
    const [options,setOptions]=useState([]);
    const [currCategories,setCurrCategories]=useState([]);
    const [loading,setLoading]=useState(false);
    
    //Contexts
    const [myTheme,setTheme]=useContext(ThemeContext);
    const [auth,setAuth]=useContext(AuthContext);

    //ref's
    const editor = useRef(null);

    //router
    const router=useRouter();

    const getCategories=async ()=>{

        try {
            
            const {data}=await axios.get("/categories");

            if(data?.success){
                let newOpt=[];
                for(let i=0; i<data.categories.length; i++){
                    newOpt.push({
                        value : data.categories[i]._id,
                        label : data.categories[i].name,
                    });
                }
                setOptions(newOpt);
            }
            else{
                console.log("Unable to fetch categories",data.error);
            }
        } catch (error) {
            console.log("Unable to fetch categories");
        }

    }


    useEffect(()=>{
            if(localStorage.getItem("post-title")){
                setTitle(localStorage.getItem("post-title"));
            }
            if(localStorage.getItem("post-content")){
                setContent(localStorage.getItem("post-content"));
            }
            if(auth?.user) getCategories();
    },[auth?.token]);
    

	let config = {
        readonly : false,
        placeholder : "Start writing awesome content",
        minHeight : "300px",
        theme : myTheme,
    }

    const handleTitleChange=(e)=>{
        setTitle(e.target.value);
        localStorage.setItem("post-title",e.target.value);
    }

    const handleJoditBlur=(newContent)=>{
        console.log("in jodit blur");
        setContent(newContent);
        localStorage.setItem("post-content",newContent);

    }

    const handleSelectChange=(value)=>{
        console.log(`Selected : ${value}`);
        setCurrCategories([...currCategories,value]);
        console.log(currCategories);
    }

    const handlePostSave=async ()=>{
        setLoading(true);
        try {
            
            const {data}=await axios.post("/posts/create-post",{title,content,categories : currCategories},{
                headers :{
                    'Content-Type' : 'application/json'
                }
            });

            if(data?.success){
                toast.success("Post created successfully");
                setContent('');
                setCurrCategories([]);
                setTitle("");
                localStorage.removeItem("post-content");
                localStorage.removeItem("post-title");
                setLoading(false);
                router.push("/admin/posts");
                
            }
            else{
                toast.error(data.error);
                setLoading(false);
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Some error occured");
            setLoading(false);
        }

    }


    return (
        <AdminLayout>
            <Row>
                <Col xs={22} sm={22} lg={10} offset={1} >
                    <h1 style={{paddingTop : "10px"}}>Add new Content Here</h1>
                    {/*<TextEditor />*/}
                    <Input value={title} onChange={handleTitleChange} prefix={<EditOutlined className="site-form-item-icon" />} placeholder="Title" />
                    <br/>
                    <br/>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent=>handleJoditBlur(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                    />
                </Col>
                <Col xs={22} sm={22} lg={10} offset={1}>
                    <h1 style={{paddingTop : "10px"}}>Categories</h1>
                    <Select
                        mode="multiple"
                        placeholder="Select Category"
                        onChange={handleSelectChange}
                        style={{
                            width: '100%',
                        }}
                        options={options}
                    />
                    <br/>
                    <br/>
                    <Button type="primary" onClick={handlePostSave} loading={loading}>Save Post</Button>
                </Col>
            </Row>
        </AdminLayout>
    )
}

export default newpost;