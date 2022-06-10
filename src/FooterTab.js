import React from 'react'
import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
const { Footer } = Layout;

const FooterTab = () => {
  return (
    <Footer
        style={{
            textAlign: 'center',
        }}
    >
        Timesheet Design ©2022 Created by ACW
    </Footer>
  )
}

export default FooterTab