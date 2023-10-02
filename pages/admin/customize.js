import { Divider,Tabs,Row,Col,Input,Button,Image } from "antd";
import UploadImage from "../../components/FeaturedImages/UploadImage";
import FeaturedImage from "../../components/FeaturedImages/FeaturedImage";
import useHome from "../../hooks/useHome";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { MediaContext } from "../../context/media";


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


const customize = ()=>{

    //context
    const {media,setMedia}=useContext(MediaContext)

    //states
    const [loading,setLoading]=useState(false);

    //hooks
    const {title,subTitle,fullWidthImage,setTitle,setSubTitle}=useHome();

    //functions

    async function handleSave(){

        try {
            setLoading(true);
            const {data} = await axios.post('/website/upsert-page',{
                page : "home",
                title,
                subTitle,
                featuredImage : media?.selected?.image._id || fullWidthImage._id
            });
            
            if(data?.success){
                toast.success("Changes saved");
                setTitle("");
                setSubTitle("");
                setMedia({...media,selected : null})
            }
            else{
                toast.error(data.error);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("An error occured, please contact support");
            setLoading(false);
        }

    }

    return(
        <>
        <Divider style={{marginTop : "40px"}}>
            <h1>Start Customizing</h1>
        </Divider>
        <Row>
            <Col span={16} offset={1}>
                <Tabs defaultActiveKey="1" items={items} />
                <Input 
                    style={{margin : "20px 0 20px 0"}}
                    size="large"
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                    placeholder="Enter Title here"
                />
                <Input 
                    style={{margin : "20px 0 20px 0"}}
                    size="large"
                    value={subTitle}
                    onChange={(e)=>{setSubTitle(e.target.value)}}
                    placeholder="Enter Subtitle here"
                />
                <Button loading={loading} icon={<UploadOutlined />} onClick={handleSave}>Save</Button>
            </Col>
            <Col span={6}>
                 {(media?.selected?.image)? <Image width="100%" src={media.selected.image.url} />
                  :(fullWidthImage)?<Image width="100%" src={fullWidthImage.url}/> : <Image src=""/>
                 }
            </Col>
        </Row>
        </>

    );

}

export default customize;