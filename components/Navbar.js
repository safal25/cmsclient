import { UserAddOutlined,UserOutlined, CloudOutlined, SettingOutlined,LogoutOutlined,HddOutlined,DatabaseOutlined,ContactsOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState,useContext } from 'react';
import ToggleTheme from './ToggleTheme';
import { ThemeContext } from '../context/theme';
import {AuthContext} from '../context/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

const {SubMenu}=Menu;

const Navbar = () => {
  
  const [current, setCurrent] = useState('mail');
  const [auth,setAuth] = useContext(AuthContext);
  const [myTheme]=useContext(ThemeContext);
  const router=useRouter();

  const signout=()=>{
    setAuth({
        token : "",
        user : null
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("theme");
    router.push("/Signin");
  }

  const getUserLink=()=>{

    if(auth?.user?.role==='Admin'){
        return "/admin";
    }
    else if(auth?.user?.role==='Author'){
        return "/author";
    }
    else{
        return "/subscriber";
    }
  }

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (<Menu  onClick={onClick} selectedKeys={[current]} mode="horizontal"  >
            <Menu.Item key="CMS" icon={<CloudOutlined />}>
                <Link href="/">
                    CMS
                </Link>
            </Menu.Item>
            <Menu.Item key="Post" icon={<DatabaseOutlined />}>
                <Link href="/post">
                    Post
                </Link>
            </Menu.Item>
            <Menu.Item key="Contact" icon={<ContactsOutlined />}>
                <Link href="/contact">
                    Contact
                </Link>
            </Menu.Item>
           {auth?.user===null && 
           (<>
           <Menu.Item key="Signup" icon={<UserAddOutlined /> } style={{marginLeft : 'auto'}}>
                <Link href="/Signup">
                    Signup
                </Link>
            </Menu.Item>
            <Menu.Item key="Signin" icon={<UserOutlined />}>
                <Link href="/Signin">
                    Signin
                </Link>
            </Menu.Item> 
            </>)}
            {auth?.user!==null && 
            (<>
                <SubMenu theme={myTheme} key="SubMenu" icon={<SettingOutlined /> } title={auth?.user?.username || "Panel"} style={{marginLeft : "auto"}}>
                    <Menu.ItemGroup title="Management">
                        <Menu.Item key="Dashboard" icon={<HddOutlined/>}>
                            <Link href={getUserLink()}>
                                Dashboard
                            </Link>
                        </Menu.Item>
                        <Menu.Item onClick={signout} key="Signout" icon={<LogoutOutlined />}>Signout</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="toggletheme">
                    <ToggleTheme />
                </Menu.Item>
            </>
            )
            }


          </Menu>);
};

export default Navbar;