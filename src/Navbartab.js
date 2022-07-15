import React, {useState} from 'react'
import 'antd/dist/antd.min.css';
import { Link } from "react-router-dom";

import { Layout, Button, Dropdown, Menu, Modal, Form, Input, Popconfirm, List, Avatar} from 'antd';
import {
    HomeOutlined,
    DatabaseOutlined,
    SettingOutlined,
    FileAddOutlined,
    OrderedListOutlined,
    DeleteOutlined,
    UserAddOutlined,
    CloudUploadOutlined,
    UserOutlined
    // EditOutlined
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
                        <p><FileAddOutlined /> Add Project </p>
                    ),
                },
                {
                    key: '2',
                    onClick: (() => {
                        setVisible2(true);
                    }),
                    label: (
                        <p><OrderedListOutlined /> My Projects </p>
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
                <Menu.Item key='title' style={{ color: 'black' }}>TimeSheet</Menu.Item>
                <Menu.Item key='home'><Link to="/home"><HomeOutlined /> Home </Link></Menu.Item>
                <Menu.Item key='mysheet'><Link to="/mysheet"> <DatabaseOutlined /> MySheet </Link></Menu.Item>                                
                <Menu.Item key='newuser'><Link to="/newuser"> <UserAddOutlined /> New User </Link></Menu.Item>                                
                <Menu.Item key='documents'><Link to="/documents"> <CloudUploadOutlined /> Documents </Link></Menu.Item>                                
                <Menu.Item key='profile'><Link to="/profile"> <UserOutlined /> {props.user} </Link></Menu.Item>                                                
                <Menu.Item key='settings'>
                    <Dropdown
                        overlay={menu}
                        placement="bottom"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <Button><SettingOutlined />Settings</Button>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item key='signout'><Button onClick={props.signOut}> Signout </Button></Menu.Item>                                
            </Menu>

            <Modal title="Add Project" visible={visible}   
                onCancel={onCancel}             
                footer={[                                   
                ]}
            >
                <Form id='form2' form={form} name="project_controls" onFinish={(fieldsValue) => { props.onAdd(fieldsValue); onReset(); }}>              
                    <Form.Item name="projectname" label="Project">
                        <Input autoComplete='off' placeholder="Project Name" required="required"/>
                    </Form.Item>                    
                    <Form.Item name="projectmanager" label="Manager">
                        <Input autoComplete='off' placeholder="Project Manager" required="required"/>
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
                    <List
                        itemLayout="horizontal"
                        dataSource={props.project}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="" />}
                                    title={<a href="">{item.project}</a>}
                                    description={item.manager}
                                />
                                <Popconfirm
                                    title="Are you sure to delete ?"
                                    onConfirm={(e) => { props.onProjectDelete(item); }}
                                    onCancel={(e) => { }}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteOutlined
                                        style={{ color: "red", marginLeft: 12 }}
                                    />
                                </Popconfirm>
                            </List.Item>
                        )}
                    />
                            {/* <p>{project.project}</p> 
                            <p>{project.manager}</p>
                            <Popconfirm
                                title="Are you sure to delete ?"
                                onConfirm={(e) => { props.onProjectDelete(project); }}
                                onCancel={(e) => { }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <DeleteOutlined
                                    style={{ color: "red", marginLeft: 12 }}
                                />
                            </Popconfirm>                         */}
                </div>
            </Modal>
        </Header>
    )
}

export default Navbartab