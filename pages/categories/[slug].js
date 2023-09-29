import {useState,useEffect,useContext} from "react";
import { Card,Avatar,Divider,Row,Col,Button } from "antd";
import useCategory from "../../hooks/useCategory";
import useLatestPosts from "../../hooks/useLatestPosts";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/theme";

const {Meta} = Card;

const postsByCategories = ()=>{

    //context
    const [myTheme,setTheme]=useContext(ThemeContext);
    
    //states
    const [posts,setPosts]=useState([]);
    const [category,setCategory]=useState("");

    //router
    const router = useRouter();

    //hooks
    const {categories} = useCategory();
    const {latestPosts} = useLatestPosts(); 

    useEffect(()=>{
       if(router.query.slug) getPostsByCategory()
    },[router.query.slug]);

    const getPostsByCategory = async ()=>{
        console.log(router);
        try {

            const {data} = await axios.get(`/posts/get-post-by-category/${router.query.slug}`);
            if(data?.success){
                
                setPosts(data.Posts);
                setCategory(data.category.name);
            }
            else{
                console.log(data.error);
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Internal Server error")
        }

    }

    return (
        
        <Row> 
            <Col xs={24} xl={16}>
                <h1 style={{"textAlign" : "center","fontSize" :20,"marginBottom" : 12,"marginTop" : 5}}>Posts in {category}</h1>
                {posts.map((post)=>{
                    return (
                        <Card>
                            <Meta
                                avatar={<Avatar src={post.featuredImage?.url || "images/tech.jpg"} />}
                                title={<Link href={`/post/${post.slug}`}  >{post.title}</Link>}
                                description={<p style={{"color" : myTheme==="dark"?"white":""}}>Posted by {post.postedBy.username}</p>}
                            />
                        </Card>
                    )
                })}
            </Col>
            <Col xs={22} xl={6} offset={1} >
                <Divider>Categories</Divider>
                {categories.map((category,index)=>{
                    return (<Link key={index} href={`/categories/${category.slug}`}>
                                <Button style={{"marginLeft" : 5,"marginTop" : 5}}>{category.name}</Button>
                            </Link>)
                })}
                <Divider>Recent Posts</Divider>
                {latestPosts.map((latestPost)=>{
                    return(<Link key={latestPost._id} href={`/post/${latestPost.slug}`}>
                                <p style={{"marginLeft" : 10}}>{latestPost.title}</p>
                            </Link>)
                })}
            </Col>
        </Row>
        
    )

}

export default postsByCategories