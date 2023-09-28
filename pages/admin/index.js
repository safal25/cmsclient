import AdminLayout from "../../components/layouts/AdminLayout"
import {Row,Col} from "antd"
import ProgressComponent from "../../components/ProgressComponent"
import axios from "axios"
import { useEffect,useState } from "react"
import toast from "react-hot-toast"

const admin=()=>{
    //state
    const [numbers,setNumbers]=useState({});

    //lifecycle hooks
    useEffect(()=>{
        fetchAnalytics();
    },[]);

    //methods

    const fetchAnalytics = async ()=>{
        try {

            const {data} = await axios.get('/website/analytics');
            if(data.success){
                setNumbers({
                    postCount : data.postCount,
                    commentCount : data.commentCount,
                    userCount : data.userCount,
                    categoryCount : data.categoryCount
                });
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Internal server error, please contact support");
        }
    }

    return (
        <AdminLayout>
            <Row>
                <Col span={24}>
                    <h1 style={{"textAlign" :"center", "marginTop" : 10}}>Statistics</h1>
                </Col>
            </Row>
            <Row style={{"marginTop" : 100}}>
                <Col span={12}>
                     <ProgressComponent number={numbers.postCount} name="Posts" link="/admin/posts" />
                </Col>
                <Col span={12}>
                    <ProgressComponent number={numbers.userCount} name="Users" link="/admin/users" />
                </Col>
            </Row>
            <Row style={{"marginTop" : 100}}>
                <Col span={12}>
                    <ProgressComponent number={numbers.commentCount} name="Comments" link="/admin/comments" />
                </Col>
                <Col span={12}>
                    <ProgressComponent number={numbers.categoryCount} name="Categories" link="/admin/posts/categories" />               
                </Col>
            </Row>
        </AdminLayout>
    )
}

export default admin;