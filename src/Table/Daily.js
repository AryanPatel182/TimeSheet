import React, { useState, useEffect } from 'react';
import { Table, Modal, Tag, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import moment from 'moment'
import { Button, Form, Input, Select, Popconfirm, Progress, Col, Row, Tabs } from 'antd';
import { DatePicker, TimePicker } from 'antd';
import { Space } from 'antd';
import { message } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

const Daily = (props) => {
    const [form] = Form.useForm();
    const [date_chooser] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState(null);
    const [datadate, setDatadate] = useState(moment(new Date()).format('DD-MM-YYYY'));
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

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            // render: (text) => <p>{text}</p>,
        },
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
        },
        // {
        //     title: 'Arrival Time',
        //     dataIndex: 'atime',
        //     key: 'atime',
        // },
        // {
        //     title: 'Leaving Time',
        //     dataIndex: 'ltime',
        //     key: 'ltime',
        // },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';

                        if (tag === 'less') {
                            color = 'red';
                        }
                        if (tag === 'good') {
                            color = 'green';
                        }

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => (
                <>
                    <Popconfirm
                        title="Are you sure to delete ?"
                        onConfirm={(e) => { props.onDelete(record.key, e); }}
                        onCancel={(e) => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{ color: "red", marginLeft: 12 }}
                        />
                    </Popconfirm>
                    <span
                        onClick={(e) => { onUpdate(record, e); }}
                    >
                        <EditOutlined
                            style={{ color: "blue", marginLeft: 12 }}
                        />
                    </span>
                </>
            ),
        },
    ];

    const onUpdate = (record) => {
        setVisible(true);
        onFill(record); 
        setEditing({ ...record });
    }

    const onSubmit = (fieldsValue) => {
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

                if ((item.date !== date) || (item.key === editing.key) || ((eh < ish || (eh === ish && em < ism)) || (sh > ieh || (sh === ieh && sm > iem)))) {
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
                    ...editing, 'date': date, 'project': project,
                    'atime': atime, 'ltime': ltime, tags: tags, 'description': description
                })
                message.success('Updated Successfully !');
            }
        }
        setVisible(false);
    }

    useEffect(() => {
        if (editing !== null) {
            props.onUpdate(editing);
        }
    }, [editing])


    const onFill = (record) => {
        form.setFieldsValue({
            datepicker: moment(record.date, 'DD-MM-YYYY'),
            project: record.project,
            atimepicker: moment(record.atime, 'HH:mm:ss'),
            ltimepicker: moment(record.ltime, 'HH:mm:ss'),
            description: record.description
        });
    };

    const onCancel = () => {
        setVisible(false);
    }

    const style = {
        padding: '8px 0',
    };

    useEffect(() => {
        date_chooser.setFieldsValue({
            datepicker: moment(new Date(), 'DD-MM-YYYY'),            
        });
    }, [])
    

    return (
        <>                                         
            <Form id='form2' form={date_chooser} name="choose_date_for_data">
                <Form.Item name="datepicker" label="Date">
                    <DatePicker onChange={(e) => {setDatadate(e.format('DD-MM-YYYY'))}}/>
                </Form.Item>
            </Form>

            {/* <DatePicker onChange={(e) => { setDatadate(e.target.value)}}/>             */}
            <Table columns={columns} dataSource={props.data.filter((obj) => {
                // return obj.date === moment(new Date(), 'DD-MM-YYYY').format('DD-MM-YYYY')
                // return obj.date === datadate;
                return obj.date === datadate;
            })} />
            <Modal title="Update Form" visible={visible}
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
                        <Button style={{ margin: "0 0 0 10px" }} key="back" onClick={onCancel}>
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Daily;