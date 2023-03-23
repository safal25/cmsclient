import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { MediaContext } from '../../context/media';


const {Dragger}=Upload;


const FeaturedImage=()=>{

    const [auth,setAuth]=useContext(AuthContext);
    const {media,setMedia}=useContext(MediaContext);

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
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p>Click or drag file to this area to upload</p>
        </Dragger>
      );

}

export default FeaturedImage;