import { Badge, Calendar } from 'antd';
import React, { useState, useEffect } from 'react';
import { Table, Modal, Tag, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import moment from 'moment'
import { Button, Form, Input, Select, Popconfirm, Progress, Col, Row, Tabs } from 'antd';
import { DatePicker, TimePicker } from 'antd';
import { message } from 'antd';

import {
    WeeklyCalendar,
} from 'antd-weekly-calendar';

const { TabPane } = Tabs;
const { Option } = Select;

const CalendarTab = (props) => {
    const [form] = Form.useForm();
    const [editing, setEditing] = useState(null);
    const [id, setId] = useState(-1);
    const [visible, setVisible] = useState(false);
    const events = [];

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

    const getStartTime = (date, atime) => {
        let startTime = new Date(parseInt(date.substring(6)), parseInt(date.substring(3, 5))-1, parseInt(date.substring(0, 2)), parseInt(atime.substring(0, 2)), parseInt(atime.substring(3, 5)), 0);
        return startTime;
    }

    const getEndTime = (date, ltime) => {
        let endTime = new Date(parseInt(date.substring(6)), parseInt(date.substring(3, 5))-1, parseInt(date.substring(0, 2)), parseInt(ltime.substring(0, 2)), parseInt(ltime.substring(3, 5)), 0);
        return endTime;
    }

    
    props.data.map((event) => {
        let stime = getStartTime(event.date, event.atime);
        let etime = getEndTime(event.date, event.ltime);
        events.push({ eventId: event.key, startTime: stime, endTime: etime, title: event.description, backgroundColor: 'rgb(152 216 142 / 32%)' });
    })
    

    const onSubmit = (fieldsValue) => {
        const key = parseInt(id);
        const date = fieldsValue['datepicker'].format('DD-MM-YYYY');    
        const project = fieldsValue['project'];
        const atime = fieldsValue['atimepicker'].format('HH:mm:ss');
        const ltime = fieldsValue['ltimepicker'].format('HH:mm:ss');
        const description = fieldsValue['description'];

        let sh = parseInt(atime[0] + atime[1]);
        let eh = parseInt(ltime[0] + ltime[1]);
        let sm = parseInt(atime[3] + atime[4]);
        let em = parseInt(ltime[3] + ltime[4]);

        if (eh - sh < 0 || (eh - sh === 0 && em - sm < 0)) {
            message.error('Wrong Start/End Time !');
        }
        else {
            let flag = true;
            props.data.map((item) => {
                let ish = parseInt(item.atime[0] + item.atime[1]);
                let ieh = parseInt(item.ltime[0] + item.ltime[1]);
                let ism = parseInt(item.atime[3] + item.atime[4]);
                let iem = parseInt(item.ltime[3] + item.ltime[4]);

                if ((item.date !== date) || (item.key === key) || ((eh < ish || (eh === ish && em < ism)) || (sh > ieh || (sh === ieh && sm > iem)))) {
                    // flag = true;
                }
                else {
                    flag = false;
                }
            })
            if (flag === false) {
                message.error('Already filled time interval!');
            }
            else {
                let tags = ['good'];
                let hd = eh - sh;   // Hour Duration 
                let md = em - sm;   // Minutes Duration            
                if (md < 0) {
                    hd = hd - 1;
                    md = md + 60;
                }
                if (parseInt(hd) < 8) {
                    tags[0] = 'less';
                }

                setEditing({
                    'key': key, 'date': date, 'project': project,
                    'atime': atime, 'ltime': ltime, tags: tags, 'description': description
                })
                message.success('Updated Successfully !');
            }
        }
        setVisible(false);
    }

    const onUpdate = (record) => {
        setVisible(true);
        onFill(record);      
        setId(record.eventId);        
    }
    
    const onFill = (record) => {
        let project = null;
        props.data.map((item) => {
            if(item.key === record.eventId)
            {
                project = item.project;
                return;
            }
        })
        form.setFieldsValue({
            datepicker: moment(record.startTime, 'DD-MM-YYYY'),
            project: project,
            atimepicker: moment(record.startTime, 'HH:mm:ss'),
            ltimepicker: moment(record.endTime, 'HH:mm:ss'),
            description: record.title
        });        
    };

    const onCancel = () => {
        setVisible(false);
    }

    useEffect(() => {
        if (editing !== null) {
            props.onUpdate(editing);
        }
    }, [editing])

    return (
        <div>            
            <WeeklyCalendar
                events={events}                                                     
                onEventClick={(event) => onUpdate(event)}
                onSelectDate={(date) => console.log(date)}                
            />
            <Modal title="Update Data" visible={visible}
                onCancel={onCancel}
                footer={[
                    // <Button key="back" onClick={onCancel}>
                    //     Return
                    // </Button>,                                       
                ]}
            >
                <Form id='form1' form={form} name="time_related_controls" {...formItemLayout} onFinish={onSubmit}>
                    <Form.Item name="datepicker" label="Date" {...config}>
                        <DatePicker />
                    </Form.Item>      
                    <Form.Item name="project" label="Project" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a project"
                            allowClear
                        >
                            {props.project && props.project.map((item) => (
                                <Option key={item.project} value={item.project}>{item.project}</Option>
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
                        <Button style={{ margin: "0 0 0 10px" }} onClick={onCancel} key="back">
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};

export default CalendarTab;
