import React,{useState} from 'react'
import './App.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const {  Sider } = Layout;


const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
  return (
      <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
              console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
          }}
      >
          <div className="logo"></div>
          <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['4']}
              items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                  (icon, index) => ({
                      key: String(index + 1),
                      icon: React.createElement(icon),
                      label: `nav ${index + 1}`,
                  }),
              )}
          />
      </Sider>
  )
}

export default Sidebar