import { Col, Row } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import  toast  from 'react-hot-toast';

const {TextArea}=Input;

const contact = () => {
    //states
    const [loading,setLoading]=useState(false);

    //hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        
        try {
            setLoading(true);
            const {data}=await axios.post("/website/contact",values,{
                headers :{
                    'Content-Type' : 'application/json'
                }
            });
            
            if(data.success){
                toast.success('Thanks for contacting us we will reach out to you shortly');
                setLoading(false);
                form.resetFields();
            }
            else{
                const {error}=data;
                toast.error(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred, please try again in sometime");
        }

    };

    return (
        <Row>
            <Col span={8} offset={8}>
                <h1 style={{paddingTop : "6.25rem"}}>Contact Us!</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your message',
                            },
                        ]}
                    >
                        <TextArea 
                            rows={4} 
                            placeholder="Write a message..." 
                            maxLength={1000} 
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
export default contact;