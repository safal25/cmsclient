import Link from "next/link";
import { useState,useContext,useEffect } from "react";
import { AuthContext } from "../../../context/auth";
import { ThemeContext } from "../../../context/theme";
import AdminLayout from "../../../components/layouts/AdminLayout";
import axios from "axios";
import { toast } from "react-hot-toast";
import {List, Row,Col,Input,Skeleton} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";




const commentList=()=>{

    //State
    const [commentArr,setCommentArr]=useState([]);
    const [keyword,setKeyword]=useState("");
    const [page,setPage]=useState(1)
    const [totalComments,setTotalComments]=useState(0);

    //Context
    const [auth,setAuth]=useContext(AuthContext);
    const [theme,setTheme]=useContext(ThemeContext);

    //Hooks and functions

    useEffect(()=>{
        getCount();
        if(auth?.user) fetchComments();
    },[auth?.token])

    const getCount=async ()=>{
        try {

            const {data}=await axios.get("/posts/get-comment-count");
            //console.log("post count",data);
            if(data?.success){
                
                setTotalComments(data.count);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const fetchComments=async ()=>{
        try {

            console.log("In fetch posts");
            const {data}=await axios.get(`/posts/get-comments?page=${page}`);
            if(data?.success){
                const newComments=data.comments;
                setCommentArr([...commentArr,...newComments]);
                setPage(page+1);
            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete= async (comment)=>{
        try {
            
            const {data}=await axios.delete(`/posts/delete-comment?id=${comment._id}`);
            console.log(data);
            if(data?.success){
                setCommentArr(commentArr.filter((item)=>{return item._id!==comment._id}));
                toast.success("Comment deleted successfully");
            }
            else{
                toast.error(data.error);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AdminLayout>
            <Row>
                <Col span={24}>
                    <h1>Comments</h1>
                    <Input placeholder="Search" onChange={(e)=>{setKeyword(e.target.value.toLowerCase())}} />
                    <InfiniteScroll
                        dataLength={commentArr.length}
                        next={fetchComments}
                        hasMore={commentArr.length<totalComments}
                        loader={
                            <Skeleton
                              paragraph={{
                                rows: 1,
                              }}
                              active
                            />
                          }
                    >
                        <List
                          itemLayout="horizontal"
                          dataSource={commentArr.filter((comment)=>{return comment.content.toLowerCase().includes(keyword)})}
                          bordered
                          renderItem={(comment)=>(
                            <List.Item
                                actions={
                                         [<Link href={`/post/${comment.postId.slug}`} >View</Link>,
                                          <a  onClick={()=>{handleDelete(comment)}}>Delete</a>] }
                            >
                                <List.Item.Meta 
                                    title={<p style={{color : (theme==='dark')?'white':''}}>{comment.content}</p>}
                                    description={<p style={{color : (theme==='dark')?'lightgray':''}}>{`Posted By ${comment.postedBy.username} on post ${comment.postId.title}`}</p>} 
                                />

                            </List.Item>
                            )}
                        >   
                        </List>
                    </InfiniteScroll>                
                </Col>
            </Row>
        </AdminLayout>
    )

}




export default commentList;