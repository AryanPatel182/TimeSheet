import React from 'react';
import { Form, DatePicker, TimePicker, Input, Button, Select } from 'antd';

const { Option } = Select;


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};

const AttendanceForm = (props) => {
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };
    
    return (
        <>
            <div className="site-layout-content" style={{margin:"40px 0 0 0"}}>
                <Form id='form1' form={form} name="time_related_controls" {...formItemLayout} onFinish={(fieldsValue) => { props.onFinish(fieldsValue); onReset();}}>
                    <Form.Item name="datepicker" label="Date" {...config}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="project" label="Project" rules={[{ required: true }]}>
                        
                        <Select style={{ width: "70%" }}
                            placeholder="Select a project"
                            allowClear
                        >                            
                            {props.project.length!==0 && props.project.map((option) => (
                                <Option key={option} value={option}>{option}</Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <Form.Item name="atimepicker" label="Start Time" {...config}>
                        <TimePicker />
                    </Form.Item>
                    <Form.Item name="ltimepicker" label="End Time" {...config}>
                        <TimePicker />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea style={{ width: "70%" }} />
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
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default AttendanceForm;