import {
    PushpinOutlined,
    CameraOutlined,
    UserSwitchOutlined,
    SettingOutlined,
    BgColorsOutlined,
    UserOutlined,
    CommentOutlined,
  } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useEffect, useState,useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../context/auth';


function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
}



const AuthorSidebar = () => {
    //states
    const [collapsed, setCollapsed] = useState(false);
    const [currentLink,setCurrentLink]= useState("");

    //context
    const [auth,setAuth] = useContext(AuthContext);

    //useEffect &  functions
    useEffect(()=>{

      process.browser && setCurrentLink(window.location.pathname);
      

    },[process.browser && window.location.pathname]);

    const checkLink=(name)=>{
      return (name===currentLink?"active":"");
    }

    const items = [
      getItem((<Link className={currentLink==="/author"?"active":""} href="/author">Dashboard</Link>), '1', <SettingOutlined />),
      //Posts
      getItem('Posts', 'sub1', <PushpinOutlined />, [
        getItem((<Link className={currentLink==="/author/posts"?"active":""} href="/author/posts">All Posts</Link>), '5'),
        getItem((<Link className={currentLink==="/author/posts/newpost"?"active":""} href="/author/posts/newpost">New Post</Link>), '6'),
      ]),
      //Media
      getItem('Media', 'sub2', <CameraOutlined />, [
        getItem((<Link className={checkLink("/author/media/library")} href="/author/media/library">Library</Link>), '8'),
        getItem((<Link className={checkLink("/author/media/new")} href="/author/media/new">Add New</Link>), '9'),
      ]),
      //Comments
      getItem((<Link href="/author/comments">Comments</Link>), '10', <CommentOutlined />),
      //Profile
      getItem((<Link href={`/author/${auth?.user?._id}`}>Profile</Link>), '13', <UserOutlined />),
      
    ];
  
    
    

    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
    return (
      <div>
        <Menu
          defaultOpenKeys={['sub1','sub2']}
          mode="inline"
          items={items}
        />
      </div>
    );
  };

export default AuthorSidebar;
  