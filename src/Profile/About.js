import React from 'react'
import { Table, Descriptions, Badge, Col, Row } from 'antd';
import ProfilePage from './ProfilePage';
import './Profile.css';

const About = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <div>
      <p style={{ fontWeight: 500, color: 'gray', fontSize: '9px', marginBottom: '20px' }}>CONTACT INFORMATION</p>
      <Row className='about-row'>
        <Col span={8}>
          <span>Name:</span>
        </Col>
        <Col span={8}>
          <span>Aryan Patel</span>
        </Col>
      </Row>
      <Row className='about-row'>
        <Col span={8}>
          <span>Address:</span>
        </Col>
        <Col span={8}>
          <span>525 E68 Bacon Road</span>
          <span>New York, NY 327399-00</span>
        </Col>
      </Row>
      <Row className='about-row'>
        <Col span={8}>
          <span>Email:</span>
        </Col>
        <Col span={8}>
          <span style={{ color: '#1890ff' }}>asp6304@gmail.com</span>
        </Col>
      </Row>
      <Row className='about-row'>
        <Col span={8}>
          <span>Phone:</span>
        </Col>
        <Col span={8}>
          <span style={{ color: '#1890ff' }}>+91 38741902</span>
        </Col>
      </Row>

      <p style={{ fontWeight: 500, color: 'gray', fontSize: '9px', margin: '35px 0 20px 0' }}>BASIC INFORMATION</p>
      <Row className='about-row'>
        <Col span={8}>
          <span>DOB:</span>
        </Col>
        <Col span={8}>
          <span>June 2, 1998</span>
        </Col>
      </Row>
      <Row className='about-row'>
        <Col span={8}>
          <span>Gender:</span>
        </Col>
        <Col span={8}>
          <span>Male</span>
        </Col>
      </Row>
    </div>
  )
}

export default About