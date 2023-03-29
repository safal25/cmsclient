import { Row,Col,Avatar,Card } from "antd";
import axios from "axios";
import Link from "next/link";

const post=({posts})=>{


    return (
        <Row gutter={12}>
            {(posts.map((post)=>{
                return(<Col xs={24} xl={8} style={{marginTop :'7px'}}>
                    <Card
                        hoverable
                        cover={
                            <Avatar 
                                shape="square"
                                style={{"height" : "200px"}}
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
    );

}

export async function getServerSideProps() {

    const {data}=await axios.get(`/posts/get-posts`);

    return {
      props: {posts : data.posts}, // will be passed to the page component as props
    }
}

export default post;