import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import api from '../api'

const Lines = () => {

    // data = get all datasets
    const [data, setdata] = useState([]);
    const [longitude, setlongitude] = useState(0);
    const [latitude, setlatitude] = useState(0);

    // Is immediatly triggered, fills data up
    useEffect(() => {
        getData();
        setLatandLong();
    }, []);

    const getData = async () => {
        const res = await api.getBirdRoutes();
        console.log("InGetData");
        console.log(res.data.data);
        setdata(
            res.data.data.map((row) => ({
                //Csv needs those names on the right side
                longitude: row.longitude,
                latitude: row.latitude
            }))
        );
    };

    const setLatandLong = () => {
        //console.log(data);
    };

    console.log(data);

    return (
        <p>Lines HERE</p>

    );
};

export default Lines;