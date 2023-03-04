import AdminLayout from "../../../components/layouts/AdminLayout"
import { Col, Row } from 'antd';
import { toast } from 'react-hot-toast';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { EditOutlined } from "@ant-design/icons";
import { useState ,useRef} from "react";




const categories= ()=>{

    const [loading,setLoading]=useState(false);
    const formRef=useRef(null);

    const onFinish=async (values)=>{
        setLoading(true);
        try {

            const {data}=await axios.post("/category",values,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            if(data?.success){
                toast.success('Category created successfully');
                setLoading(false);
                formRef.current?.resetFields();
            }
            else{
                toast.error(data.error);
                setLoading(false);
            }
            
        } catch (error) {
            toast.error('Cannot create category');
            setLoading(false);
        }
    }

    return (
        <AdminLayout>
            <Row>
                <Col span={12}>
                <h1 style={{paddingTop : "0.2rem",paddingBottom :"3.25rem"}}>Add category </h1>
                    <Form onFinish={onFinish} ref={formRef}>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input prefix={<EditOutlined className="site-form-item-icon" />} placeholder="Category" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
                <Col span={12}>
                    <h1 style={{paddingTop : "0.2rem"}}>Category details will be shown here</h1>
                </Col>
            </Row>
        </AdminLayout>
    );
}

export default categories;