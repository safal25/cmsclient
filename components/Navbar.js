import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState,useContext } from 'react';
import ToggleTheme from './ToggleTheme';
import { ThemeContext } from '../context/theme';
import Link from 'next/link';

const {SubMenu}=Menu;

const Navbar = () => {
  
  const [current, setCurrent] = useState('mail');
  const [myTheme]=useContext(ThemeContext);
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (<Menu  onClick={onClick} selectedKeys={[current]} mode="horizontal"  >
            <Menu.Item key="CMS" icon={<MailOutlined />}>
                <Link href="/">
                    CMS
                </Link>
            </Menu.Item>
            <Menu.Item key="Signup" icon={<AppstoreOutlined /> }>
                <Link href="/Signup">
                    Signup
                </Link>
            </Menu.Item>
            <Menu.Item key="Signin" icon={<AppstoreOutlined />}>
                <Link href="/Signin">
                    Signin
                </Link>
            </Menu.Item>
            <SubMenu theme={myTheme} key="SubMenu" icon={<SettingOutlined /> } title="Panel" style={{marginLeft : "auto"}}>
                <Menu.ItemGroup title="Management">
                    <Menu.Item key="Admin">
                        <Link href="/admin">
                            Admin
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="Dashboard">Dashboard</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="toggletheme">
                <ToggleTheme />
            </Menu.Item>
          </Menu>);
};

export default Navbar;