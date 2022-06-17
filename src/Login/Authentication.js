import { Card } from 'antd';
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
            <Card
                style={{
                    width: '75%',
                    margin:'auto'
                }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey2}
                onTabChange={(key) => {
                    onTab2Change(key);
                }}
            >
                {contentListNoTitle[activeTabKey2]}
            </Card>
        </>
    );
};

export default Authentication;