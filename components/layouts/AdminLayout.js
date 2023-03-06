import { Layout } from 'antd';
import React,{useEffect,useState,useContext} from 'react';
import AdminSidebar from "../navigation/AdminSidebar"
//import { useWindowWidth } from '@react-hook/window-size';
import axios from 'axios';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/auth';

const { Content, Sider } = Layout;

const AdminLayout=(props)=>{
    {/*const windowWidth=useWindowWidth();

    const [collapsed,setCollapsed]=useState(false);

    useEffect(()=>{

        if(windowWidth<600){
            setCollapsed(true)
        }
        else{
            setCollapsed(false)
        }
    
    },[windowWidth ]);*/}

    const [loading,setLoading]=useState(true);
    const [auth,setAuth]=useContext(AuthContext);
    const router=useRouter();

    useEffect(()=>{

        if(auth?.token) verifyAdmin();

    },[auth?.token]);

    const verifyAdmin=async ()=>{

        try {

            const {data}=await axios.post("/auth/verify-admin");

            if(data?.success){
                setLoading(false);
            }
            else{
                router.push("/");
            }
            
        } catch (error) {
            router.push("/");
        }
    }

    if(loading){

        return (
            <LoadingOutlined style={{display : 'flex',
             justifyContent : 'center',
             alignItems : 'center',
             color : 'red',
             height : '100vh',
             fontSize : '50px'}}/>
        )
    }

    return (
        <Layout>
            <Sider collapsible breakpoint='sm'  > 
                <AdminSidebar /> 
            </Sider>
            <Layout>
                <Content >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout;