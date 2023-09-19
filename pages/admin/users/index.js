import Link from "next/link";
import { useState,useContext,useEffect } from "react";
import { AuthContext } from "../../../context/auth";
import { ThemeContext } from "../../../context/theme";
import AdminLayout from "../../../components/layouts/AdminLayout";
import axios from "axios";
import { toast } from "react-hot-toast";
import {List, Row,Col, Avatar,Input} from "antd";




const userlist=()=>{

    //State
    const [users,setUsers]=useState([]);
    const [keyword,setKeyword]=useState("");

    //Context
    const [auth,setAuth]=useContext(AuthContext);
    const [theme,setTheme]=useContext(ThemeContext);

    //Hooks and functions

    const fetchUsers=async ()=>{

        try {

            const {data}=await axios.get('/user/get-users');

            if(data?.success){
                console.log(data.users);
                setUsers(data.users);
            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error('Some error occured while fetching user list');
        }
    }

    const handleDelete= async (user)=>{
        let data=null;
        try {
            if(user._id===auth.user._id){
                alert('You cannot delete your user');
            }
            console.log(`User Id is : ${user._id}`);
            
            ({data}=await axios.delete(`/user/delete-user/${user._id}`));
            console.log(data);
            if(data?.success){
                setUsers(users.filter((usr)=>{return usr._id!==user._id}));
                toast.success(data.message);
            }

        } catch (error) {
            console.log(error);
            if(data){
                toast.error(data.message);
            }
            else{
                toast.error('Oops! something went wrong');
            }
        }
    }

    useEffect(()=>{
      if(auth?.user)  fetchUsers();
    },[auth?.token]);

    return (
        <AdminLayout>
            <Row>
                <Col span={24}>
                    <h1>All Users</h1>
                    <Input placeholder="Search" onChange={(e)=>{setKeyword(e.target.value.toLowerCase())}} />
                    <List
                      itemLayout="horizontal"
                      dataSource={users.filter((user)=>{return user.username.toLowerCase().includes(keyword)})}
                      bordered
                      renderItem={(user)=>(
                        <List.Item
                           actions={[<Link href={`/admin/users/${user._id}`} >edit</Link>,
                                      <a disabled={user._id===auth?.user?._id} onClick={()=>{handleDelete(user)}}>delete</a>]}
                        >
                            <List.Item.Meta 
                                avatar={<Avatar src={user?.image?.url}>{user.username[0]}</Avatar>}
                                title={<p style={{color : (theme==='dark')?'white':''}}>{user.username}</p>}
                            />
                            <List.Item.Meta 
                                description={<p style={{color : (theme==='dark')?'lightgray':''}}>{user.email}</p>} 
                            />
                            <List.Item.Meta 
                                description={<p style={{color : (theme==='dark')?'lightgray':''}}>{user.role}</p>} 
                            />

                        </List.Item>
                      )}
                    >
                        
                    </List>
                </Col>
            </Row>
            
        </AdminLayout>
    )

}

export default userlist;