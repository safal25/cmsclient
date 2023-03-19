import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';






const UploadImage = () => {

  const [auth,setAuth]=useContext(AuthContext);

  const props = {
    name: 'file',
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
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
    );
};

export default UploadImage;