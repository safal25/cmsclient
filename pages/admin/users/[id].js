import { useEffect, useState } from "react";
import { Row,Col,Input,Button,Checkbox,Select,Tabs,Avatar } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {toast} from "react-hot-toast";
import axios from "axios";
import { generate } from "generate-password";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { useContext } from "react";
import { ThemeContext } from "../../../context/theme";
import { AuthContext } from "../../../context/auth";
import { MediaContext } from "../../../context/media";
import { useRouter } from "next/router";
import UploadImage from "../../../components/FeaturedImages/UploadImage";
import FeaturedImage from "../../../components/FeaturedImages/FeaturedImage";

const items = [
    {
      key: '1',
      label: `Upload Image`,
      children: <UploadImage/>,
    },
    {
      key: '2',
      label: `Featured Images`,
      children: <FeaturedImage />,
    },
];

const edituser=()=>{

    //states

    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState(generate({length : 8}));
    const [checked,setChecked]=useState(false);
    const [loading,setLoading]=useState(true);

    //context
    const [myTheme,setTheme]=useContext(ThemeContext);
    const [auth,setAuth]=useContext(AuthContext);
    const {media,setMedia}=useContext(MediaContext);

    //router
    const router=useRouter();

    //functions

    const fetchUser=async ()=>{
       // console.log(router.query);
        let data=null;
        try {
            
            ({data}=await axios.get(`/user/get-user/${router.query.id}`));
            console.log(data);
            if(data.success){
                setName(data.user.username);
                setRole(data.user.role);
                setEmail(data.user.email);
                if(data.user.image){
                    setMedia({...media,selected : {image : data.user.image}});
                }
                else{
                    setMedia({...media,selected : null});
                }
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
            if(data){
                toast.error(data.message);
            }
            else{
                toast.error(error.response.data.message);
            }
        }
    }

    useEffect(()=>{
        if(router.query.id) fetchUser();
    },[router.query.id]);

    const handleSubmit=async ()=>{
        
        try {
            
            /*console.log(name);
            console.log(email);
            console.log(password);
            console.log(role);*/
            const {data}=await axios.put(`/user/edit-user/${router.query.id}`,{username : name,role,email,
                                                                              password,checked,
                                                                              image : media?.selected?.image._id});

            if(data?.success){
                toast.success("User updated successfully");
                router.push('/admin/users');
            }

        } catch (error) {
            toast.error("Some error occured, please try after sometime or contact support");
            console.log(error);
        }
    }

    const handleChange=(value)=>{
        setRole(value);
    }


    //show user creation form

    return (
        <>
        {loading && (<LoadingOutlined />)}
        {!loading && 
        (<AdminLayout>
            <Row>
                <Col span={12} offset={6}>
                    <h3 style={{marginBottom : "-5px",marginTop : "5px"}} >Edit user</h3>
                    <div style={{textAlign : "center"}}>
                        <Avatar size={100} src={media?.selected?.image?.url}>{name[0].toUpperCase()}</Avatar>
                    </div>
                    <Tabs defaultActiveKey="1" items={items} />
                    <Input placeholder="User Name" 
                           value={name}
                           onChange={(e)=>{setName(e.target.value)}}
                            style={{margin : "10px 0px 10px 0px"}}
                            size="large"/>
                    <Input placeholder="Email" 
                           value={email} 
                           onChange={(e)=>{setEmail(e.target.value)}}
                           style={{margin : "10px 0px 10px 0px"}}  
                           size="large" />
                     { /* <div style={{display : "flex"}}>
                        <Button size="large" 
                                style={{margin : "10px 0px 10px 0px"}}
                                onClick={()=>{setPassword(generate({length : 8}))}}>
                                Generate Password
                        </Button>
                        <Input.Password placeholder="Password" 
                           value={password} 
                           onChange={(e)=>{setPassword(e.target.value)}}
                           style={{margin : "10px 0px 10px 0px"}}  
                           size="large" />
                        </div> */}
                    <Select style={{margin : "10px 0px 10px 0px"}}  
                            defaultValue={role}
                            size="large"
                            onChange={handleChange} 
                            options={[{value : 'Subscriber', label : 'Subscriber'},
                                     {value : "Admin",label : "Admin"},
                                     {value : "Author",label : "Author"}]}
                    />
                    <br/>
                    <Checkbox style={{margin : "10px 0px 10px 0px"}} onChange={(e)=>{setChecked(e.target.checked)}}>
                        Generate a new password and notify user
                    </Checkbox>
                    <br/>
                    <Button size="large" style={{margin : "10px 0px 10px 0px"}} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </AdminLayout>)}
        </>
    )

}

/*export async function getServerSideProps({ params }) {

    try {
        const authToken=localStorage.getItem("auth")?.token;
        const { data } = await axios.get(`/user/get-user/${params.id}`,{
            headers : {
                "Authorization" : `Bearer ${authToken}`
            }
        });

        return {
            props: { user: data?.user }
        };
        
    } catch (error) {
        console.log(error);
    }


}*/

export default edituser;