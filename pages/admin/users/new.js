import { useState } from "react";
import { Row,Col,Input,Button,Checkbox,Select } from "antd";
import {toast} from "react-hot-toast";
import axios from "axios";
import { generate } from "generate-password";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { useContext } from "react";
import { ThemeContext } from "../../../context/theme";

const newuser=()=>{

    //states

    const [name,setName]=useState('');
    const [role,setRole]=useState('Subscriber');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState(generate({length : 8}));
    const [checked,setChecked]=useState(false);

    //context

    const [myTheme,setTheme]=useContext(ThemeContext);

    //functions

    const handleSubmit=async ()=>{
        
        try {
            
            /*console.log(name);
            console.log(email);
            console.log(password);
            console.log(role);*/
            const {data}=await axios.post("/user/create-user",{username : name,role,email,password,checked});

            if(data?.success){
                toast.success("User created successfully");
                console.log(data.user)
            }
            else{
                toast.error(data.error);
            }

        } catch (error) {
            toast.error("Some error occured, please try again");
            console.log(error);
        }
    }

    const handleChange=(value)=>{
        setRole(value);
    }


    //show user creation form

    return (
        <AdminLayout>
            <Row>
                <Col span={12} offset={6}>
                    <h3 style={{marginBottom : "-5px",marginTop : "5px"}} >Add new user</h3>
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
                    <div style={{display : "flex"}}>
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
                    </div>
                    <Select style={{margin : "10px 0px 10px 0px"}}  
                            defaultValue="Subscriber"
                            size="large"
                            onChange={handleChange} 
                            options={[{value : 'Subscriber', label : 'Subscriber'},
                                     {value : "Admin",label : "Admin"},
                                     {value : "Author",label : "Author"}]}
                    />
                    <br/>
                    <Checkbox style={{margin : "10px 0px 10px 0px"}}>
                        Send an email to user about account creation
                    </Checkbox>
                    <br/>
                    <Button size="large" style={{margin : "10px 0px 10px 0px"}} onClick={handleSubmit}>
                        Create User
                    </Button>
                </Col>
            </Row>

        </AdminLayout>
    )

}

export default newuser;