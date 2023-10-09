import Head from "next/head";
import FullWidthImage from "../components/pages/FullWidthImage";
import useNumbers from "../hooks/useNumbers";
import { Row,Col,Divider,Button } from "antd";
import ProgressComponent from "../components/ProgressComponent";
import ParallaxImage from "../components/pages/ParallaxImage";
import useLatestPosts  from "../hooks/useLatestPosts";
import useCategory from "../hooks/useCategory";
import useHome from "../hooks/useHome";
import Link from "next/link";
import { ContainerOutlined, ApiOutlined, UserAddOutlined } from "@ant-design/icons";



function Home(){

    //hooks
    const {numbers} = useNumbers();
    const {latestPosts} = useLatestPosts();
    const {categories} = useCategory();
    const {title,subTitle,fullWidthImage}=useHome();


    return (
        <>
        <Head>
            <title>Modern Content Management System</title>
            <meta 
                name="description"
                content="Read latest blog posts on web development"
            />
        </Head>

     {title &&
     (<div>
        <FullWidthImage title={title} subTitle={subTitle} url={fullWidthImage?.url}/>
        <Row style={{"marginTop" : 230}}>
            <Col span={6}>
                <ProgressComponent number={numbers.postCount} name="Posts" link="/admin/posts" />
            </Col>
            <Col span={6}>
                <ProgressComponent number={numbers.userCount} name="Users" link="/admin/users" />
            </Col>
            <Col span={6}>
                <ProgressComponent number={numbers.commentCount} name="Comments" link="/admin/comments" />
            </Col>
            <Col span={6}>
                <ProgressComponent number={numbers.categoryCount} name="Categories" link="/admin/posts/categories" />               
            </Col>
        </Row>
        <ParallaxImage>
            <div style={{textAlign : 'center'}}>
                <Divider> 
                    <h1>Blog Posts</h1>
                </Divider>
                {latestPosts.map((post)=>{
                    return (
                        <Link key={post._id} href={`post/${post.slug}`}>
                            <p style={{fontSize : 20}}>{post.title}</p>
                        </Link>
                    );
                })}
            </div>
        </ParallaxImage>
        <div style={{textAlign : "center",marginBottom : "50px"}}>
            <Divider><h2>Categories</h2></Divider>
            {categories.map((category,index)=>{
                return (<Link key={index} href={`/categories/${category.slug}`}>
                            <Button style={{"marginLeft" : 5}}>{category.name}</Button>
                        </Link>)
            })}
        </div>
        <ParallaxImage url="images/footer.jpg">
            <Row>
                <Col style={{textAlign : "center"}} span={8}>
                    <ContainerOutlined style={{fontSize : '75px'}} />
                    <p>The Ultimate CMS platform</p>
                </Col>
                <Col style={{textAlign : "center"}}  span={8}>
                    <ApiOutlined style={{fontSize : '75px'}} />
                    <p>This is built using MERN Stack (MongoDB,Express.js,React.js,Node.js)</p>
                </Col>
                <Col style={{textAlign : "center"}}  span={8}>
                    <UserAddOutlined style={{fontSize : '75px'}} />
                    <p>Join the platform to learn more</p>
                </Col>           
            </Row>
           </ParallaxImage>
        </div>)
        }

        </>
    );
}

export default Home;