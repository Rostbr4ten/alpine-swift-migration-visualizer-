import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import api from '../api'
import Globe from 'react-globe.gl';

const Lines = () => {
    const globeEl = useRef();
    const [hoverArc, setHoverArc] = useState();
    const OPACITY = 0.22;
    const N = 20;
    const arcsData = [...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
      }));
    // data = get all datasets
    const [data, setdata] = useState([]);

    // Is immediatly triggered, fills data up
    useEffect(() => {
       /* data[0].lat = 0;
        data[0].lng = 0;
        data[1].lat = 0;
        data[1].lng = 0; */
        console.log("ArcsData");
        console.log(arcsData);
        getData();
        setLatandLong();
        globeEl.current.pointOfView({ lat: 45.8, lng: 17.3, altitude: 0.7 });
    }, []);

    const getData = async () => {
        const res = await api.getBirdRoutes();
        //console.log("InGetData");
        //console.log(res.data.data);
        setdata(
            res.data.data.map((row) => ({
                //Csv needs those names on the right side
                timestamp: row.time,
                startLat: row.lat1,
                startLng: row.lng1,
                endLat: row.lat2,
                endLng: row.lng2,
                color: [['red', 'white', 'blue', 'green'][0], ['red', 'white', 'blue', 'green'][2]]
            }))
        );
    };

    const setLatandLong = () => {
        console.log("DATA")
        console.log(data);
    };

    console.log(data[0]);

    if(data.length > 1){
        
    }
    return (
        <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            arcsData={data}
            arcLabel={'timestamp'}
            arcColor={'color'}
            // Highlight nodes
            /*arcColor={d => {
                const op = !hoverArc ? OPACITY : d === hoverArc ? 0.9 : OPACITY / 4;
                return [`rgba(0, 255, 0, ${op})`, `rgba(255, 0, 0, ${op})`];
              }}*/
            arcDashLength={() => 0.5}
            arcDashGap={() => 0.5}
            arcDashAnimateTime={() => 2000}
            onArcHover={setHoverArc}
        />

    );
};

export default Lines;