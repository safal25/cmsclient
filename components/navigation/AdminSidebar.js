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



  const AdminSidebar = () => {

    //states
    const [collapsed, setCollapsed] = useState(false);
    const [currentLink,setCurrentLink]= useState("");
    
    //context
    const [auth,setAuth]=useContext(AuthContext);

    //functions & useEffect
    useEffect(()=>{

      process.browser && setCurrentLink(window.location.pathname);
      

    },[process.browser && window.location.pathname]);

    const checkLink=(name)=>{
      return (name===currentLink?"active":"");
    }

    const items = [
      getItem((<Link className={currentLink==="/admin"?"active":""} href="/admin">Dashboard</Link>), '1', <SettingOutlined />),
      //Posts
      getItem('Posts', 'sub1', <PushpinOutlined />, [
        getItem((<Link className={currentLink==="/admin/posts"?"active":""} href="/admin/posts">All Posts</Link>), '5'),
        getItem((<Link className={currentLink==="/admin/posts/newpost"?"active":""} href="/admin/posts/newpost">New Post</Link>), '6'),
        getItem((<Link className={currentLink==="/admin/posts/categories"?"active":""} href="/admin/posts/categories">Categories</Link>), '7'),
      ]),
      //Media
      getItem('Media', 'sub2', <CameraOutlined />, [
        getItem((<Link className={checkLink("/admin/media/library")} href="/admin/media/library">Library</Link>), '8'),
        getItem((<Link className={checkLink("/admin/media/new")} href="/admin/media/new">Add New</Link>), '9'),
      ]),
      //Comments
      getItem((<Link href="/admin/comments">Comments</Link>), '10', <CommentOutlined />),
      //Users
      getItem('Users', 'sub3', <UserSwitchOutlined />, [
          getItem((<Link href="/admin/users">All Users</Link>), '11'),
          getItem((<Link href="/admin/users/new">Add New</Link>), '12'),
      ]),
      //Profile
      getItem((<Link href={`/admin/${auth?.user?._id}`}>Profile</Link>), '13', <UserOutlined />),
      //Customize
      getItem((<Link href="/admin/customize">Customize</Link>), '14', <BgColorsOutlined />),
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
  export default AdminSidebar;
  