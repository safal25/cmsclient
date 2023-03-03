import { Col, Row } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';
import { useContext,useState } from 'react';
import  toast  from 'react-hot-toast';

const Signup = () => {

    const [auth,setAuth]=useContext(AuthContext);
    const [loading,setLoading]=useState(false);
    const router=useRouter();

    const onFinish = async (values) => {
        
        setLoading(true);
        const {data}=await axios.post("/auth/signup",values,{
            headers :{
                'Content-Type' : 'application/json'
            }
        });
        
        if(data.success){
            const {token,user}=data;
            setAuth({token,user});
            localStorage.setItem('auth',JSON.stringify({token,user}));
            toast.success('User created successfully');
            setLoading(false);
            router.push("/admin");
        }
        else{
            const {error}=data;
            toast.error(error);
            setLoading(false);
        }
    };

    return (
        <Row>
            <Col span={8} offset={8}>
                <h1 style={{paddingTop : "6.25rem"}}>Signup</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                            type='password'
                            placeholder="Password"
                        />
                    </Form.Item>
                    <br/>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Register
                        </Button>
                        Or <Link href="/Signin">Sign in!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Signup;