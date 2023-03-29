import { Row, Col, Card,Avatar } from "antd";
import axios from "axios";
import StringToHtml from "../../components/StringToHtml";
import { useRef,useContext } from "react";
import { ThemeContext } from "../../context/theme";
import dynamic from "next/dynamic";
import parse from 'html-react-parser';

const JoditEditor=dynamic(()=> import('jodit-react'),{ssr : false,});


const slug = ({ post }) => {

    const editor = useRef(null);

    const [myTheme,setTheme]=useContext(ThemeContext);

    let config = {
        readonly : true,
        placeholder : "Start writing awesome content",
        minHeight : "300px",
        theme : myTheme,
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
                    {/*<JoditEditor
                        ref={editor}
                        value={post.content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        //onBlur={newContent=>handleJoditBlur(newContent)} // preferred to use only this option to update the content for performance reasons
                        //onChange={(newContent) => {}}
                />*/}
                 <StringToHtml content={post.content} />
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
        props: { post: data.post }
    };
}

export default slug;