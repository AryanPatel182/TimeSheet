import React, { useState, useEffect } from 'react';
import { Col, Row, Image, Card, Divider, Button } from 'antd';
import  './Profile.css';
import { Tabs } from 'antd';
import About from './About';
import Checklist from './Checklist';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { API, graphqlOperation } from "aws-amplify";


const { TabPane } = Tabs;

const ProfilePage = () => {  
    const [profiledata, setProfiledata] = useState([]);
    
    const fetchData = async () => {
        const profile = await API.graphql({ query: queries.listEmployees });
        // console.log(profile)
        const val = profile.data.listEmployees.items[0];
        const values = { dob : val.dob, firstName : val.firstName, middleName: val.middleName, lastName : val.lastName, gender : val.gender, phone : val.phone, email : val.email, skills: val.skills, addressLine1: val.addressLine1, addressLine2: val.addressLine2, experience: val.experience};   
        console.log(val.skills);
        setProfiledata(values);
    };

    fetchData();
    useEffect(() => {
        fetchData();
    }, [])

    console.log(profiledata);
    return (

        <>
            {/* <Row>
            <Col span={24}>col</Col>
        </Row> */}
            <div className='profile-top'>
                <Row style={{gap:'20px'}}>
                    <Col span={8}>
                        <Row>
                            <Col span={24}>
                                <Image
                                    width={170}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU"
                                />
                            </Col>
                        </Row>
                        <Divider />

                        <div>
                            <p style={{ fontWeight: 360, color: 'gray' }}>work</p>
                            {/* <Button type="primary">primary</Button> */}
                            <div style={{ margin: '0 0 12px 0', 'fontWeight': '600' }}>
                                ACW Technologies
                            </div>
                            <div>
                                <p style={{ margin: 0, color: '#5c5a5a', fontSize: '12px' }}>#123 16th street </p>
                                <p style={{ margin: 0, color: '#5c5a5a', fontSize: '12px' }}>New York NY 10020-3029-11</p>
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <p style={{ fontWeight: 360, color: 'gray' }}>skills</p>                        {/* <Button type="primary">primary</Button> */}
                            <div>
                                {
                                    {/* profiledata && profiledata.skills.forEach((skill) => {                                        
                                        console.log(skill)
                                    }) */}
                                }                                                                                                    
                                {/* {profiledata.skills.map((skill) => {                                    
                                })} */}
                                        {/* <p style={{ margin: 0, color: '#5c5a5a', fontSize: '12px', fontWeight: '600' }}>React</p> */}
                                <p style={{ margin: 0, color: '#5c5a5a', fontSize: '12px', fontWeight: '600' }}>Django</p>
                            </div>                            
                        </div>
                        {/* <Row>
                        <Col span={24}>col</Col>
                    </Row> */}

                    </Col>
                    <Col span={12} style={{ padding: '0 0px' }}>
                        <div>
                            <p style={{ fontSize: '25px', margin: '0' }}>{profiledata.firstName} {profiledata.lastName}</p>
                            <span style={{ fontSize: '10px', color: '#2590f4' }}>Product Designer</span>
                        </div>
                        <div style={{margin:'25px 0 0 0'}}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="About" key="1">
                                    <About profiledata={profiledata}/>
                                </TabPane>
                                <TabPane tab="Checklist" key="2">
                                    <Checklist/>
                                </TabPane>                                
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* <Row>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
        </Row>
        <Row>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
        </Row> */}
        </>
    );
}


export default ProfilePage;