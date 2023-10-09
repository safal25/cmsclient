import { Row,Col,Avatar,Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useContext,useEffect,useState } from "react";
import { AuthContext } from "../../context/auth";
import InfiniteScroll from "react-infinite-scroll-component";

const post=({posts})=>{

    //states
    const [postArr,setPostArr]=useState(posts);
    const [page,setPage]=useState(2);
    const [totalPosts,setTotalPosts]=useState(0);

    //useEffect & functions

    useEffect(()=>{
        getCount();
    },[])

    const getCount=async ()=>{
        try {

            const {data}=await axios.get("/posts/get-post-count");
            //console.log("post count",data);
            if(data?.success){
                
                setTotalPosts(data.count);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    const fetchPosts=async ()=>{
        try {

            console.log("In fetch posts");
            const {data}=await axios.get(`/posts/get-posts/${page}`);
            if(data?.success){
                const newPosts=data.posts;
                setPostArr([...postArr,...newPosts]);
                setPage(page+1);
            }
            else{
                toast.error(data.error);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <InfiniteScroll 
        dataLength={postArr.length}
        next={fetchPosts}
        hasMore={postArr.length<totalPosts}
        loader={<LoadingOutlined />}
        >
        <Row gutter={12}>

            {(postArr.map((post)=>{
                return(
                <Col key={post.slug} xs={24} xl={8} style={{marginTop :'7px'}}>
                    <Card
                        hoverable
                        cover={
                            <Avatar 
                                shape="square"
                                style={{"height" : "300px"}}
                                src={post.featuredImage?.url || "images/tech.jpg"}
                                alt='loading...'
                            />
                        }
                    >
                        <Link href={`post/${post.slug}`}>
                            <h3>{post.title}</h3>
                        </Link>
                    </Card>
                </Col>)
            }))}
        </Row>
        </InfiniteScroll>
    );

}

export async function getServerSideProps() {
    
    const {data}=await axios.get(`https://cmsbackend-k3j4.vercel.app/api/posts/get-posts/1`);

    return {
      props: {posts : data.posts}, // will be passed to the page component as props
    }
}

export default post;