import { InboxOutlined,CloseCircleOutlined } from '@ant-design/icons';
import { message, Upload,Image,Badge } from 'antd';
import { useContext,useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { MediaContext } from '../../context/media';
import axios from 'axios';

const {Dragger}=Upload;


const FeaturedImage=()=>{

    //state
    const [showPreview,setShowPreview]=useState(false);

    //context
    const [auth,setAuth]=useContext(AuthContext);
    const {media,setMedia}=useContext(MediaContext);
    

    const getImages=async ()=>{
        try {

          const {data}=await axios.get('/media/get-images');

          if(data?.success){
            setMedia({...media,Images : data?.images});
          }
          else{
            console.log('Error in fetching images');
          }

        } catch (error) {
            console.log('Error in fetching images',error);
        }
    }

    useEffect(()=>{
      getImages();
    },[]);

    const deleteImage=async (id)=>{
      try {

        const {data}=await axios.delete(`/media/delete-image/${id}`)
        if(data?.success){
          setMedia({...media,Images : media.Images.filter((image)=>{return image._id!==id})});
        }
        
      } catch (error) {
          console.log('Error while deleting images',error);
      }
    }


    const props = {
        name: 'file',
        multiple :true,
        action: 'http://localhost:5000/api/media/upload-image',
        headers: {
          authorization: `Bearer ${auth?.token}`,
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);

            setMedia({
                Images : [...media.Images,info.file.response],
                selected : info.file.response,
                showMediaModal : false,
            });

          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
      };


      return (
        <>
          <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                  <InboxOutlined />
              </p>
              <p>Click or drag file to this area to upload</p>
          </Dragger>
          <div style={{textAlign : 'center'}}>
              {media?.Images.length!==0 && (
                  media.Images.map((img)=>{
                   return <Badge>
                     <Image  preview={showPreview} src={img.url} style={{
                      paddingTop : '5px',
                      paddingRight : '10px',
                      height : '100px',
                      width : '100px',
                      objectFit : 'cover',
                    }} onClick={()=>(setMedia({...media,selected : {image : img}}))}/>
                     <br/>
                     <CloseCircleOutlined style={{color : '#f5222d'}} onClick={()=>{deleteImage(img._id)}}/>
                    </Badge>
                  })
              )}
          </div>
        </>
      );

}

export default FeaturedImage;