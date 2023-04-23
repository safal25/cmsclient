import AdminLayout from "../../../components/layouts/AdminLayout";
import { useRouter } from "next/router";
import { Button } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import {useState,useEffect,useContext} from "react";
import { toast } from "react-hot-toast";
import { PostContext } from "../../../context/post";
import AllPostList from "../../../components/PostComponents/AllPostList";

const allposts = () => {
    //states
    const {posts,setPosts}=useContext(PostContext);
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
                setPosts(data.posts);
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
        router.push(`/admin/posts/${post.slug}`)
    }

    const handleDelete=async (postId)=>{
        try {
            const {data} = await axios.delete(`/posts/delete-post/${postId}`);
            
            if(data?.success){
                toast.success('Post deleted successfully');
                setPosts(posts.filter((post)=>{return post._id!==postId}));
                console.log(data.post);
            }
            else{
                toast.error(data.error);
            }
            
          } catch (error) {
            toast.error('Some error occured, please try again later');
            console.error(error);
          }
    }

    return (
        <AdminLayout>
            <div style={{padding : "10px 0px 10px 10px"}}>
            <Button type="primary" onClick={handleAddNew}>
                <PlusOutlined /> Add New
            </Button>
            </div>
            <h1 style={{paddingLeft : "10px"}}>All Posts</h1>
            <AllPostList posts={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
        </AdminLayout>
    );
}

export default allposts;