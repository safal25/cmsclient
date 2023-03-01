import { Layout } from 'antd';
import React,{useEffect,useState} from 'react';
import AdminSidebar from "../navigation/AdminSidebar"
import { useWindowWidth } from '@react-hook/window-size';

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