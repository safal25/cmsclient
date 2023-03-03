import { Col, Row } from 'antd';
import { LockOutlined,MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import {useContext,useState} from 'react';
import { AuthContext } from '../context/auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/router';
const Signin = () => {

    const [loading,setLoading]=useState(false);
    const [auth,setAuth]=useContext(AuthContext);
    const router=useRouter();

    const onFinish = async (values) => {

        setLoading(true);
        const {data}=await axios.post("/auth/signin",values,{
            headers :{
                'Content-Type' : 'application/json'
            }
        });
        
        if(data.success){
            const {token,user}=data;
            setAuth({token,user});
            localStorage.setItem('auth',JSON.stringify({token,user}));
            toast.success('Logged in successfully');
            setLoading(false);
            router.push("/");
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
                <h1 style={{ paddingTop: "6.25rem" }}>Signin</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
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
                    <Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Log in
                        </Button>
                        <span style={{paddingLeft : "5px"}}>Or</span> <Link href="/Signup">register now!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Signin;