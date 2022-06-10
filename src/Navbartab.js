import React from 'react'
import 'antd/dist/antd.min.css';
import { Link } from "react-router-dom";

import { Layout, Menu } from 'antd';
const { Header} = Layout;


const Navbartab = () => {
    // let navarr = ['Home', 'Mysheet'] 
  return (
      <Header>
          <div className="logo" />
          <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['home']}              
           >                                              
              <Menu.Item key='home'><Link to="/home"> Home </Link></Menu.Item>
              <Menu.Item key='mysheet'><Link to="/mysheet"> MySheet </Link></Menu.Item>
              <Menu.Item key='dummy'> some non-clickable text </Menu.Item>                            
          </Menu>
          
      </Header>
  )
}

export default Navbartab