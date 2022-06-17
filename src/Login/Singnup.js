import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Input, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './Login.css';

export default function Signup({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    
    return (
        <>
            <div className="login-wrapper">
                <Card
                    title="Sign Up"
                    bordered={false}
                    style={{
                        width: 300,
                    }}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        // onFinish={handleSubmit}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={e => setUserName(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Item>                        

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Register
                            </Button>
                            <br></br>
                            Or <a href="/">Login</a>
                        </Form.Item>
                    </Form>
                </Card>

            </div>

        </>
    )
}
