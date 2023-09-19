import { Row, Col, Card,Avatar,List } from "antd";
import axios from "axios";
import StringToHtml from "../../components/StringToHtml";
import { useRef,useContext,useState } from "react";
import { ThemeContext } from "../../context/theme";
import { toast } from "react-hot-toast";
import CommentForm from "../../components/CommentComponents/CommentForm";


const slug = ({ post,allComments }) => {

    //state
    const [comment,setComment]=useState("")
    const [comments,setComments]=useState(allComments);
    const [loading,setLoading]=useState(false);

    //useRef
    const editor = useRef(null);

    //context
    const [myTheme,setTheme]=useContext(ThemeContext);

    //functions 

    const handleSubmit = async ()=>{
        try {
            setLoading(true);
            const {data} = await axios.post(`/posts/add-comment/${post._id}`,{comment},{
                                            headers : {
                                                'Content-Type' : 'application/json'
                                            }});
            
            if(data?.success){
                setComments([data.newComment,...comments]);
            }
            else{
                toast.error("An error occured while posting comment, please retry in sometime");
            }
            setLoading(false);
            setComment("");
        } catch (error) {
            toast.error("An error occured while posting comment, please retry in sometime");
            console.log(error);
        }
    }


    return (
        <Row>
            <Col xs={24} xl={16}>
                <Card
                    hoverable
                    cover={
                        <Avatar 
                            shape="square"
                            src={post.featuredImage?.url || "../images/tech.jpg"}
                            alt='loading...'
                            style={{height : "300px"}}
                         />
                    }
                >
                    <StringToHtml content={post.content} />
                    <CommentForm 
                        loading={loading}
                        comment={comment}
                        setComment={setComment}
                        handleSubmit={handleSubmit}
                    />
                    <div style={{marginTop : 30}}></div>
                    {comments.length!==0 && 
                        <List
                        itemLayout="horizontal"
                        dataSource={comments}
                        bordered
                        renderItem={(item)=>(
                            <List.Item>
                                <List.Item.Meta 
                                    avatar={<Avatar >{item.postedBy.username[0]}</Avatar>}
                                    title={<p style={{color : (myTheme==='dark')?'white':''}}>{item.postedBy.username}</p>}
                                    description={<p style={{color : (myTheme==='dark')?'white':''}}>{item.content}</p>}
                                />
                            </List.Item>
                        
                        
                        )}>
                        </List>}
                    
                </Card>
            </Col>
            <Col xs={24} xl={8}>
                <h1>Sidebar</h1>
            </Col>
        </Row>
    )

}

export async function getServerSideProps({ params }) {

    const { data } = await axios.get(`/posts/get-post/${params.slug}`);
    return {
        props: { post: data.post,allComments : data.comments }
    };
}

export default slug;