import { Card, Row, Col, Image } from 'antd';
import { useState } from 'react';
import Login from './Login';
import Signup from './Singnup';

const tabListNoTitle = [
    {
        key: 'login',
        tab: 'Login',
    },
    {
        key: 'signup',
        tab: 'Signup',
    },    
];


const Authentication = ({setToken}) => {
        
    const [activeTabKey2, setActiveTabKey2] = useState('login');

    const onTab2Change = (key) => {
        setActiveTabKey2(key);
    };


    const contentListNoTitle = {
        login: <Login setToken={setToken}></Login>,
        signup: <Signup></Signup>,
    };
    return (
        <>
            <Row>
                <Col span={12}>
                    <img style={{ width: '50vw', height: '100vh' }}  src="https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-mortgage-loan-poster-background-material-image_174232.jpg" />
                </Col>
                <Col span={12}>
                    <Card
                        style={{
                            width: '100%',
                            margin: 'auto'
                        }}
                        tabList={tabListNoTitle}
                        activeTabKey={activeTabKey2}
                        onTabChange={(key) => {
                            onTab2Change(key);
                        }}
                    >
                        {contentListNoTitle[activeTabKey2]}
                    </Card>
                </Col>
            </Row>            
        </>
    );
};

export default Authentication;