import AdminLayout from "../../../components/layouts/AdminLayout";
import { useRouter } from "next/router";
import { List, Button } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import {useState,useEffect} from "react";
import { toast } from "react-hot-toast";

const allposts = () => {
    //states
    const [posts,setPosts]=useState([]);
    //router
    const router = useRouter();

    //useEffects

    useEffect(()=>{
        fetchPosts();
    },[]);

    //methods
    const fetchPosts=async ()=>{

        try {

            const {data}=await axios.get("/posts/get-posts");

            if(data?.success){
                setPosts(posts.concat(data.posts));
            }
            else{
                toast.error(data.error);
            }
            
        } catch (error) {
            toast.error("Some error occured while fetching posts");
        }
    }

    const handleAddNew=()=>{
        router.push("/admin/posts/newpost");
    }
    
    const handleEdit=(post)=>{
        console.log(post);
    }

    const handleDelete=(slug)=>{
        console.log(slug);
    }

    return (
        <AdminLayout>
            <div style={{padding : "10px 0px 10px 10px"}}>
            <Button type="primary" onClick={handleAddNew}>
                <PlusOutlined /> Add New
            </Button>
            </div>
            <h1 style={{paddingLeft : "10px"}}>All Posts</h1>
            <List
                itemLayout="horizontal"
                dataSource={posts}
                bordered
                renderItem={(item) => (
                    <List.Item

                        actions={[<a onClick={() => handleEdit(item)}>edit</a>, <a onClick={() => handleDelete(item.slug)}>delete</a>]}
                    >
                        <h4>{item.title}</h4>
                    </List.Item>
                )}
            />
        </AdminLayout>
    );
}

export default allposts;