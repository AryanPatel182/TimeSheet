import React, {useState} from 'react'
import 'antd/dist/antd.min.css';
import { Link } from "react-router-dom";

import { Layout, Button, Dropdown, Menu, Modal, Form, Input } from 'antd';
import {
    HomeOutlined,
    DatabaseOutlined
} from '@ant-design/icons';
const { Header } = Layout;


const Navbartab = (props) => {    
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    onClick: (() => {
                        setVisible(true);
                    }),
                    label: (
                        <p> Add Project </p>
                    ),
                },
                {
                    key: '2',
                    onClick: (() => {
                        setVisible2(true);
                    }),
                    label: (
                        <p>My Projects </p>
                    ),
                },
            ]}
        />
    );

    const onCancel = () => {
        setVisible(false);
        setVisible2(false);
    }

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };
    return (
        <Header>
            <div className="logo" />        
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['home']}
            >
                <Menu.Item style={{ color: 'black' }}>TimeSheet</Menu.Item>
                <Menu.Item key='home'><Link to="/home"><HomeOutlined /> Home </Link></Menu.Item>
                <Menu.Item key='mysheet'><Link to="/mysheet"> <DatabaseOutlined />MySheet </Link></Menu.Item>                
                <Menu.Item key='settings'>
                    <Dropdown
                        overlay={menu}
                        placement="bottom"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <Button>Settings</Button>
                    </Dropdown>
                </Menu.Item>
            </Menu>
            <Modal title="Add Project" visible={visible}   
                onCancel={onCancel}             
                footer={[                                   
                ]}
            >
                <Form id='form2' form={form} name="project_controls" onFinish={(fieldsValue) => { props.onAdd(fieldsValue); onReset(); }}>              
                    <Form.Item name="projectname" label="Project">
                        <Input placeholder="Project Name"/>
                    </Form.Item>                    
                    <Form.Item
                        wrapperCol={{
                            xs: {
                                span: 24,
                                offset: 0,
                            },
                            sm: {
                                span: 16,
                                offset: 8,
                            },
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                        <Button style={{ margin: "0 0 0 10px" }} key="back" onClick={onCancel}>
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="My Projects" visible={visible2}   
                onCancel={onCancel}             
                footer={[                                   
                ]}
            >
                <div>
                    {props.project.length !== 0 && props.project.map((option) => (
                        <p>{option}</p>
                    ))}
                </div>
            </Modal>
        </Header>
    )
}

export default Navbartab