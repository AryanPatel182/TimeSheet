import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { PhoneOutlined, MailOutlined,UserOutlined } from "@ant-design/icons";
import { Form, Select, Col, Row, Tabs } from 'antd';
import { Space } from 'antd';
import './MySheet.css';
import Daily from './Table/Daily';
import Weekly from './Table/Weekly';

const { TabPane } = Tabs;
const Mysheet = (props) => {        
    return (
        <>            
            <div className="site-card-border-less-wrapper">       
                {/* <Row 
                    gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,                        
                    }}
                    style={{ margin: 'auto' }}
                >
                    <Col className="gutter-row" span={12}>
                        <Card
                            bordered={false}
                            style={{
                                width: '85%',
                                margin: 'auto',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <p><UserOutlined /> Aryan Patel</p>
                            <p style={{
                                color: 'gray',
                            }}> <Space><MailOutlined /></Space> asp6304@gmail.com</p>
                            <p style={{ color: 'gray' }}> <Space><PhoneOutlined /></Space>  +91 9327310217</p>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={12} style={{ margin: 'auto' }}>                                                                   
                    </Col>                   
                </Row>                  */}
            </div>
            <div className='tabs'>
                <Tabs type="card">
                    <TabPane tab="Daily" key="1">
                        <Daily data={props.data} onUpdate={props.onUpdate} onDelete={props.onDelete}/>                        
                    </TabPane>
                    <TabPane tab="Weekly" key="2">
                        <Weekly data={props.data}></Weekly>
                    </TabPane>
                    <TabPane tab="Calendar" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>                       
        </>
    )
}

export default Mysheet;