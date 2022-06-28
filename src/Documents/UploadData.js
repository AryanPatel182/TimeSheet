import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Select } from 'antd';
import { useState } from 'react';
import './Documents.css'
const { Option } = Select;

const onChange = (value) => {
    console.log(`selected ${value}`);
};

const onSearch = (value) => {
    console.log('search:', value);
};

const UploadData = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        setUploading(true); // You can use any AJAX library you like
        
        formData.forEach(item => {
            console.log(item)
        });
        fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
    return (
        <>
            <div className='upload-top'>
                <p> Upload Documents</p>
                <Select
                    showSearch
                    placeholder="Type of a Document"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                >
                    <Option value="Doc1">Doc1</Option>
                    <Option value="Doc2">Doc2</Option>
                    <Option value="Doc3">Doc3</Option>
                </Select>
                
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{
                        marginTop: 16,
                    }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>                
            </div>            
        </>
    );
};

export default UploadData;
