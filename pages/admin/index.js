import AdminLayout from "../../components/layouts/AdminLayout"
import {Row,Col,Divider} from "antd"
import ProgressComponent from "../../components/ProgressComponent"
import useNumbers from "../../hooks/useNumbers"


const admin=()=>{

    const {numbers} = useNumbers();

    return (
        <AdminLayout>
            <Row>
                <Col span={24}>
                    <Divider>
                        <h1 style={{textAlign :"center", marginTop : 10,fontSize : 20}}>Statistics</h1>
                    </Divider>
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