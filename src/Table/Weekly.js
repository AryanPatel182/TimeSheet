import React, { useState, useEffect } from 'react';
import { Table, Modal, Tag, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import moment from 'moment'
import { Button, Form, Input, Select, Popconfirm, Progress, Col, Row, Tabs } from 'antd';
import { DatePicker, TimePicker } from 'antd';
import { Space } from 'antd';
import { message, } from 'antd';


const Weekly = (props) => {
    var startOfWeek = moment().startOf('isoweek').format('DD-MM-YYYY')
    var endOfWeek = moment().endOf('isoweek').toDate();
    let week = [];
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    week.push(startOfWeek);

    for (let i = 0; i < 6; i++) {
        let date = parseInt((week[i][0] + week[i][1])) + 1;
        let month = parseInt((week[i][3] + week[i][4]));
        let year = parseInt(week[i][6] + week[i][7] + week[i][8] + week[i][9]);

        if (date > parseInt(endOfWeek[0] + endOfWeek[1])) {
            month += 1;
            if (month === 13) {
                month = 1;
                year += 1;
            }
        }
        let today = date + '-' + (month < 10 ? '0' : '') + month + '-' + year;
        week.push(today);
    }
    const columns = [
        {
            title: <span>{week[0]}</span>,
            dataIndex: 'monday',
            key: 'monday',
        },
        {
            title: <span>{week[1]}</span>,
            dataIndex: 'tuesday',
            key: 'tuesday',
        },
        {
            title: <span>{week[2]}</span>,
            dataIndex: 'wednesday',
            key: 'wednesday',
        },
        {
            title: <span>{week[3]}</span>,
            dataIndex: 'thursday',
            key: 'thursday',
        },
        {
            title: <span>{week[4]}</span>,
            dataIndex: 'friday',
            key: 'friday',
        },
        {
            title: <span>{week[5]}</span>,
            dataIndex: 'saturday',
            key: 'saturday',
        },
        {
            title: <span>{week[6]}</span>,
            dataIndex: 'sunday',
            key: 'sunday',
        },
        {
            title: 'Total Hours',
            dataIndex: 'total',
            key: 'total',
        },
    ];

    const findWorkingHours = (atime, ltime, ohrs, omin) => {
        let sh = parseInt(atime[0] + atime[1]);
        let eh = parseInt(ltime[0] + ltime[1]);
        let sm = parseInt(atime[3] + atime[4]);
        let em = parseInt(ltime[3] + ltime[4]);

        let wh = eh - sh;
        let wm = em - sm;

        if (wm < 0) {
            wh -= 1;
            wm += 60;
        }

        let temp = wh * 60 + ohrs * 60 + wm + omin;

        return [Math.floor(temp / 60), temp % 60];
    }

    const getWeeklyData = (data) => {
        let newData = { 'monday': { 'hrs': 0, 'min': 0 }, 'tuesday': { 'hrs': 0, 'min': 0 }, 'wednesday': { 'hrs': 0, 'min': 0 }, 'thursday': { 'hrs': 0, 'min': 0 }, 'friday': { 'hrs': 0, 'min': 0 }, 'saturday': { 'hrs': 0, 'min': 0 }, 'sunday': { 'hrs': 0, 'min': 0 } };
        let rowData = [{ 'monday': '', 'tuesday': '', 'wednesday': '', 'thursday': '', 'friday': '', 'saturday': '', 'sunday': '', 'total': '' }];

        let tm = 0;
        data.map((item) => {
            let idx = week.indexOf(item.date)
            if (idx !== -1) {
                let day = days[idx];
                let wh = findWorkingHours(item.atime, item.ltime, newData[day].hrs, newData[day].min);
                newData[day].hrs = wh[0];
                newData[day].min = wh[1];
                rowData[0][day] = wh[0] + 'h : ' + wh[1] + 'm';
            }
        })

        for (let i = 0; i < days.length; i++) {
            tm += parseInt(newData[days[i]].hrs * 60) + parseInt(newData[days[i]].min);
        }

        rowData[0]['total'] = (Math.floor(tm / 60)) + 'h : ' + (tm % 60) + 'm';
        return rowData;
    }

    return (
        <>
            <Table columns={columns} dataSource={getWeeklyData(props.data)} />            
        </>
    )
}

export default Weekly