import { UserAddOutlined,UserOutlined, CloudOutlined, SettingOutlined,LogoutOutlined,HddOutlined } from '@ant-design/icons';
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
    router.push("/Signin");
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
                <SubMenu theme={myTheme} key="SubMenu" icon={<SettingOutlined /> } title="Dashboard" style={{marginLeft : "auto"}}>
                    <Menu.ItemGroup title="Management">
                        <Menu.Item key="Admin" icon={<HddOutlined/>}>
                            <Link href="/admin">
                                Admin
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