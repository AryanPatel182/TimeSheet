import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Radio,
    Select,
    Switch,
    TreeSelect,            
} from 'antd';
import moment from 'moment'

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from 'react';
import './UserProfile.css'

const { Option } = Select;

const UserForm = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [profiledata, setProfiledata] = useState([]);

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const [value, setValue] = useState(1);
    const [exp, setExp] = useState(0);

    const onChange = (e) => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="91">+91</Option>                
            </Select>
        </Form.Item>
    );

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    
    const onSubmit = async (fieldsValue) => {
        const firstName= fieldsValue['firstName'];
        const middleName= fieldsValue['middleName'];
        const lastName= fieldsValue['lastName'];
        const addressLine1 = fieldsValue['addressLine1'];
        const addressLine2 = fieldsValue['addressLine2'];
        const gender = fieldsValue['gender'] === 1 ? "Male":"Female";
        const dob = fieldsValue['dob'].format('DD-MM-YYYY');
        const experience = exp;
        const phone = fieldsValue['phone'];
        const email = fieldsValue['email'];                
        const profile = await API.graphql({ query: queries.listEmployees });
        const len = profile.data.listEmployees.items.length;
        console.log(len)
        if (len === 1) {    
            const value = { id: profile.data.listEmployees.items[0].id, firstName: firstName, middleName: middleName, lastName: lastName, addressLine1: addressLine1, addressLine2: addressLine2, gender: gender, dob: dob.toString(), experience: experience, phone: phone, email: email, skills: ["UI/UX", "Coding", "Gaming"] };
            const updateUserdetail = await API.graphql({ query: mutations.updateEmployee, variables: { input: value } });            
        }
        else
        {
            const value = { firstName: firstName, middleName: middleName, lastName: lastName, addressLine1: addressLine1, addressLine2: addressLine2, gender: gender, dob: dob.toString(), experience: experience, phone: phone, email: email, skills: ["UI/UX", "Coding", "Gaming"] };
            const newProfile = await API.graphql({ query: mutations.createEmployee, variables: { input: value } });
        }
        message.success("Registered Successfully")
        fetchData();

    }
    const [form] = Form.useForm();

    const fetchData = async () => {
        const profile = await API.graphql({ query: queries.listEmployees });        
        const len = profile.data.listEmployees.items.length;
        if(len === 1)
        {
            const val = profile.data.listEmployees.items[0]; 
            setExp(val.experience);          
            form.setFieldsValue({
                firstName: val.firstName,
                middleName: val.middleName,
                lastName: val.lastName,
                gender: val.gender==="Male"?1:2,
                addressLine1: val.addressLine1,
                addressLine2: val.addressLine2,
                dob: moment(val.dob, 'DD-MM-YYYY'),
                // experience: val.experience,
                phone: val.phone,
                email: val.email,
            });
        }        
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='form-top'>
            <Form
                id='form' form={form} name="user_data" onFinish={onSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >                                
                <Form.Item label="First Name" name="firstName">
                    <Input />                    
                </Form.Item>
                <Form.Item label="Middle Name" name="middleName">
                    <Input />                    
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                    <Input />                    
                </Form.Item>                
                <Form.Item label="Address Line-1" name="addressLine1">
                    <Input />                    
                </Form.Item>                
                <Form.Item label="Address Line-2" name="addressLine2">
                    <Input />                    
                </Form.Item>                
                <Form.Item label="Gender" name="gender">
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Male</Radio>
                        <Radio value={2}>Female</Radio>
                    </Radio.Group>
                </Form.Item>                                
                <Form.Item label="Birth Date" name="dob">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Experience" name="experience">
                    <InputNumber min={0} defaultValue={exp} value={exp} onChange={(e) => setExp(e)} /> years
                </Form.Item>
                <Form.Item       
                    name="email"          
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item   
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>                
                {/* <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item> */}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>                    
                </Form.Item>
            </Form>            
        </div>
    );
};

export default UserForm;