import { Col, Row } from 'antd';
import { LockOutlined,MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import {useContext,useState,useRef} from 'react';
import { AuthContext } from '../context/auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/router';

const forgotPassword = () => {

    const [loading,setLoading]=useState(false);
    const [visible,setVisible]=useState(false);
    const formRef=useRef(null);
    const [auth,setAuth]=useContext(AuthContext);
    const router=useRouter();

    const forgot=async (values)=>{
        
        try {
            const {data}=await axios.post("/auth/forgot-password",values,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
    
            if(data.success){
                toast.success('The code to reset password has been sent successfully to your email');
                setLoading(false);
                setVisible(true);
            }
            else{
                toast.error(data.error);
                setLoading('false');
            }
            
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
    }

    const reset=async (values)=>{
        try {

            const {data}=await axios.post("/auth/reset-password",values,{
                headers :{
                    'Content-Type' : 'application/json'
                }
            });

            if(data.success){
                toast.success('Password reset successfull, please login again with new password');
                formRef.current?.resetFields();
                setLoading(false);
                setVisible(false);
            }
            else{
                toast.error(data.error);
                setLoading(false);
            }
            
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
    }

    const onFinish = async (values) => {

        setLoading(true);
        if(!visible){
            forgot(values);
        }
        else{
            reset(values);
        }
    };

    return (
        <Row>
            <Col span={8} offset={8}>
                <h1 style={{ paddingTop: "6.25rem" }}>Forgot Password</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    ref={formRef}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type : 'email',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    {   visible &&
                       (<>
                        <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your reset code!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Reset Code"
                        />
                        </Form.Item>
                        <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                        >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                        </Form.Item>
                        </> 
                       )
                    }
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

export default forgotPassword;