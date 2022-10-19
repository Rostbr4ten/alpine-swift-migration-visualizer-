import React, { useState, useEffect } from 'react'
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;
const Datepicker = () => {
    const changeDisable = () => {
        setDisable = false;
    };
    const [disable, setDisable] = useState(true);
    const onChangeDates = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };
    return (
        <Space direction="vertical" size={12}>
            <RangePicker format="YYYY/MM/DD HH:mm:ss" disabled={disable} onChange={onChangeDates} onClick={changeDisable} />
            <RangePicker picker="week" format="YYYY/MM/DD HH:mm:ss" onChange={onChangeDates} />
            <RangePicker picker="month" format="YYYY/MM/DD HH:mm:ss" onChange={onChangeDates} />
            <RangePicker picker="quarter" format="YYYY/MM/DD HH:mm:ss" onChange={onChangeDates} />
            <RangePicker picker="year" format="YYYY/MM/DD HH:mm:ss" onChange={onChangeDates} />
        </Space>

    );
};

export default Datepicker;