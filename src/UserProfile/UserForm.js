import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    
} from 'antd';
import { useState } from 'react';
import './UserProfile.css'

const UserForm = () => {
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div className='form-top'>
            <Form
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
                {/* <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item> */}
                <Form.Item label="Name">
                    <Input />
                </Form.Item>
                <Form.Item label="First Name">
                    <Input />                    
                </Form.Item>
                <Form.Item label="Middle Name">
                    <Input />                    
                </Form.Item>
                <Form.Item label="Last Name">
                    <Input />                    
                </Form.Item>                
                <Form.Item label="Gender">
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Male</Radio>
                        <Radio value={2}>Female</Radio>
                    </Radio.Group>
                </Form.Item>                                
                <Form.Item label="Birth Date">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Experience">
                    <InputNumber/> years
                </Form.Item>
                {/* <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item> */}
            </Form>
        </div>
    );
};

export default UserForm;