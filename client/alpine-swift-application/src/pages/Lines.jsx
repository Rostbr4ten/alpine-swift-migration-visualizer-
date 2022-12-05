import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import api from '../api'
import Globe from 'react-globe.gl';

const Lines = ({ filter }) => {
    const globeEl = useRef();
    const [hoverArc, setHoverArc] = useState();
    const [data, setdata] = useState([]);

    const getData = async () => {
        console.log("Filter in Lines");
        console.log(filter);
        const res = await api.getBirdRoutes();
        if (filter.length == 4) {
            setdata(
                res.data.data.filter(row => row.tagLocalIdentifier.includes(filter)).
                    map((row) => ({
                        //Csv needs those names on the right side
                        timestamp: row.time,
                        startLat: row.lat1,
                        startLng: row.lng1,
                        endLat: row.lat2,
                        endLng: row.lng2,
                        id: row.tagLocalIdentifier,
                        color: [['red', 'white', 'blue', 'green'][0], ['red', 'white', 'blue', 'green'][2]]
                    }))
            );
        } else if (filter.length == 9) {
            console.log("Check for year");
            var years = filter.split('-');
            var regexYears = /2014-(08|09|10|11|12)-|2015-(01|02|03|04|05)-/;
            var yearFilter = new RegExp(years[0] + '-(08|09|10|11|12)-|' + years[1] + '-(01|02|03|04|05)-')
            setdata(
                res.data.data.filter(row => yearFilter.test(row.time)).
                    map((row) => ({
                        //Csv needs those names on the right side
                        timestamp: row.time,
                        startLat: row.lat1,
                        startLng: row.lng1,
                        endLat: row.lat2,
                        endLng: row.lng2,
                        id: row.tagLocalIdentifier,
                        color: [['red', 'white', 'blue', 'green'][0], ['red', 'white', 'blue', 'green'][2]]
                    }))
            );
        } else {
            setdata(0);
        }
    };

    // Is immediatly triggered, fills data up
    useEffect(() => {
        getData();
        globeEl.current.pointOfView({ lat: 45.8, lng: 17.3, altitude: 0.7 });
        console.log(data);
    }, []);

    return (
        <Globe
            ref={globeEl}
            //globeImageUrl="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg"
            //backgroundImageUrl="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/background_milky_way.jpg"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            /*            
            globeImageUrl="..\..\..\..\..\server\storedData\earth-night.jpg"
            backgroundImageUrl="..\..\..\..\..\server\storedData\night-sky.png"
            */
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