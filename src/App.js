import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import Navbartab from './Navbartab';
import FooterTab from './FooterTab';
import AttendanceForm from './AttendanceForm';
import MySheet from './MySheet';
import { message } from 'antd';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


const { Content } = Layout;

const App = () => {

  const onFinish = (fieldsValue) => {    
    const date = fieldsValue['datepicker'].format('YYYY-MM-DD');
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
      data.map((item) => {
        
        let ish = parseInt(item.atime[0] + item.atime[1]);
        let ieh = parseInt(item.ltime[0] + item.ltime[1]);
        let ism = parseInt(item.atime[3] + item.atime[4]);
        let iem = parseInt(item.ltime[3] + item.ltime[4]);

        if ((eh<ish || (eh===ish && em<ism)) || (sh>ieh || (sh === ieh && sm>iem)) ){
          // flag = true;
        }
        else
        {
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

        var sno;
        if (data === null || data.length === 0) {
          sno = 0;
          const values = { key: sno, date: date, project: project, atime: atime, ltime: ltime, tags: tags, description: description };
          setData([values]);
        }
        else {
          sno = data[data.length - 1].key + 1;
          const values = { key: sno, date: date, project: project, atime: atime, ltime: ltime, tags: tags, description: description };
          setData([...data, values]);
        }
        message.success('Submitted Successfully !');
      }
    }
  };

  const onDelete = (key, e) => {
    // e.preventDefault();
    setData(data.filter((obj) => {
      return obj.key !== key;
    }));
    message.success('Deleted Successfully !');
  }

  const onUpdate = (ndat, e) => {
    console.log("New Data ", ndat)
    setData(data.map((obj) => {
      if (obj.key === ndat.key) {
        return ndat;
      }
      return obj;

    }))
  }

  let initData;
  if (localStorage.getItem("data") === null) {
    initData = [];
  }
  else {
    initData = JSON.parse(localStorage.getItem("data"));
  }

  const [data, setData] = useState(initData);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data])

  return (
    <Layout className="layout">
      <Router>
        <Navbartab />
        <Routes>

          <Route path="/" element={<Content
            style={{
              padding: '0 50px',
            }}>
            <AttendanceForm data={data} onFinish={onFinish} />
          </Content>} />

          <Route path="/home" element={<Content
            style={{
              padding: '0 50px',
            }}>
            <AttendanceForm data={data} onFinish={onFinish} />
          </Content>} />

          <Route path="/mysheet" element={<MySheet data={data} onDelete={onDelete} onUpdate={onUpdate} />} />

        </Routes>
        <FooterTab />
      </Router>
    </Layout>
  )
}

export default App;