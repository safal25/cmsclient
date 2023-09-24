import { Row, Col, Card,Avatar,List,Modal,Input } from "antd";
import axios from "axios";
import StringToHtml from "../../components/StringToHtml";
import { useRef,useContext,useState } from "react";
import { ThemeContext } from "../../context/theme";
import { AuthContext } from "../../context/auth";
import { toast } from "react-hot-toast";
import CommentForm from "../../components/CommentComponents/CommentForm";
import {FacebookShareButton,LinkedinShareButton,TwitterShareButton,FacebookIcon,LinkedinIcon,TwitterIcon} from "react-share";


const {TextArea}=Input;

const slug = ({ post,allComments }) => {

    //state
    const [comment,setComment]=useState("")
    const [comments,setComments]=useState(allComments);
    const [loading,setLoading]=useState(false);
    const [showModal,setShowModal]=useState(false);
    const [currComment,setCurrComment]=useState({});
    const [content,setContent]=useState("");


    //useRef
    const editor = useRef(null);

    //context
    const [myTheme,setTheme]=useContext(ThemeContext);
    const [auth,setAuth]=useContext(AuthContext);

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

    const handleDelete= async (item)=>{
        try {
            
            const {data}=await axios.delete(`/posts/delete-comment?id=${item._id}`);
            console.log(data);
            if(data?.success){
                setComments(comments.filter((comm)=>{return comm._id!==item._id}));
                toast.success("Comment deleted successfully");
            }
            else{
                toast.error(data.error);
            }

        } catch (error) {
            console.log(error);
        }
    }

    
    const handleEdit=(item)=>{
        setShowModal(true);
        setCurrComment(item);
        setContent(item.content);
    }

    
    const handleUpdate= async ()=>{

        try {

            const {data}= await axios.put(`/posts/update-comment?id=${currComment._id}`,{
                content
            });

            if(data?.success){
                let arr=comments;
                let index = comments.findIndex((c)=>{return c._id===currComment._id});
                arr[index].content=data.comment.content;
                setComments(arr);
                setShowModal(false);
                toast.success("Comment updated successfully")
            }
            else{
                toast.error(data.error);
            }
            
        } catch (error) {
            toast.error("Some error occured, please contact support");
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
                    <FacebookShareButton url={process.browser && window.location.href}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    
                    <TwitterShareButton url={process.browser && window.location.href}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>

                    <LinkedinShareButton url={process.browser && window.location.href}>
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>

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
                            <List.Item
                                actions={(auth?.user?._id===item.postedBy._id)?
                                          [<a onClick={()=>{handleEdit(item)}}>Edit</a>,<a onClick={()=>{handleDelete(item)}}>Delete</a>]
                                          :[]}
                            >
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
            <Modal bodyStyle={{backgroundColor : (myTheme==="dark")?"black":""}} 
                       onOk={()=>{handleUpdate()}} 
                       title="Update Comment" open={showModal} 
                       onCancel={()=>{setShowModal(false)}} 
                       cancelButtonProps={{type : "primary"}} 
                       okButtonProps={{disabled : (content==="")}}
                       >
                        <TextArea 
                            value={content} 
                            rows={4}
                            onChange={(e)=>{setContent(e.target.value)}}
                            maxLength={200}
                        />
            </Modal>
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