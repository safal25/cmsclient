import AdminLayout from "../../../components/layouts/AdminLayout"
import { Col, Row } from 'antd';
import { toast } from 'react-hot-toast';
import { Button, Form, Input ,List,Modal} from 'antd';
import axios from 'axios';
import { EditOutlined } from "@ant-design/icons";
import { useState ,useRef, useEffect, useContext} from "react";
import { AuthContext } from "../../../context/auth";
import { ThemeContext } from "../../../context/theme";



const categories= ()=>{

    const [loading,setLoading]=useState(false);
    const [categories,setCategories]=useState([]);
    const [auth,setAuth]=useContext(AuthContext);
    const [theme,setTheme]=useContext(ThemeContext);
    const [categoryLoading,setCategoryLoading]=useState(true);
    const [showModal,setShowModal]=useState(false);
    const [currCategory,setCurrCategory]=useState(null);
    const [currName,setCurrName]=useState("");
    const formRef=useRef(null);

    useEffect(()=>{
        console.log("inside categories useEffect",auth);
       if(auth?.user) fetchCategories();
    },[auth?.token])

    const handleDelete=async (slug)=>{

        try {
            const {data}=await axios.delete(`/category/${slug}`);

            if(data?.success){
                setCategories(categories.filter((category)=>{return category.slug!==slug}))
                toast.success("Category deleted successfully");
            }
            else{
                toast.error(data.error);
            }
            
        } catch (error) {
            toast.error("Unable to delete category");
        }
    }

    const handleEdit = (item)=>{
        setShowModal(true);
        setCurrCategory(item);
        setCurrName(item.name);
    }

    const handleNameChange = (e)=>{
        setCurrName(e.target.value);
    }

    const handleUpdate=async (slug,name)=>{

        try {

            const {data}=await axios.put(`/category/${slug}`,{name});

            if(data?.success){
                const newArr=JSON.parse(JSON.stringify(categories));

                for(var i=0; i<newArr.length; i++){
                    if(newArr[i].slug===slug){
                        newArr[i].slug=data.category.slug;
                        newArr[i].name=data.category.name;
                        break;
                    }
                }
    
                setCategories(newArr);
                toast.success('Category updated successfully');
                setShowModal(false);
            }
            else{
                toast.error(data.error);
                setShowModal(false);
            }


            
        } catch (error) {
            toast.error("Sorry couldnt update category");
        }
    }

    const fetchCategories=async ()=>{

        try {

            const {data}=await axios.get("/categories");

            if(data?.success){
                console.log("inside fetch categories",data.categories);
                setCategories(categories.concat(data.categories));
                setCategoryLoading(false);
            }
            else{
                toast.error(data.error);
                setCategoryLoading(false);
            }

            
        } catch (error) {
            toast.error("Oops, we were not able to fetch categories");
        }
    }

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
                setCategories([data.category,...categories]);
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
                <Col  xs={22} sm={22} lg={10} offset={1}>
                <h1 style={{paddingTop : "0.2rem",paddingBottom :"1.25rem"}}>Add category </h1>
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
                <Col xs={22} sm={22} lg={10} offset={1}>
                    <List 
                        itemLayout="horizontal"
                        dataSource={categories}
                        loading={categoryLoading}
                        bordered
                        renderItem={(item)=>(
                            <List.Item 
                                
                                actions={[<a onClick={()=>handleEdit(item)}>edit</a>,<a  onClick={()=>handleDelete(item.slug)}>delete</a>]}
                            >
                                <h4>{item.name}</h4>
                            </List.Item>
                        )} 
                    /> 
                    {/*<pre>{JSON.stringify(categories,null,4)}</pre>*/}
                </Col>
                <Modal bodyStyle={{backgroundColor : (theme==="dark")?"black":""}} 
                       onOk={()=>{handleUpdate(currCategory.slug,currName)}} 
                       title="Update Category" open={showModal} 
                       onCancel={()=>{setShowModal(false)}} 
                       cancelButtonProps={{type : "primary"}} 
                       >
                        <Input value={currName} onChange={handleNameChange} prefix={<EditOutlined className="site-form-item-icon" />} placeholder="Category" />
                </Modal>
            </Row>
        </AdminLayout>
    );
}

export default categories;