import React, { useState, useEffect, useRef, useMemo } from 'react'
import 'antd/dist/antd.css';
import api from '../api'
import Globe from 'react-globe.gl';

const Marker = ({ filter }) => {
    const [rise, setRise] = useState(false);
    const globeEl = useRef();
    const [hoverArc, setHoverArc] = useState();
    const [data, setdata] = useState([]);

    useEffect(() => {
        setTimeout(() => setRise(true), 500);
        getData();
        //console.log(gData);
        //console.log("-------------");
        console.log([data]);
    }, []);

    // Gen random paths
    const N_PATHS = 10;
    const MAX_POINTS_PER_LINE = 10000;
    const MAX_STEP_DEG = 1;
    const MAX_STEP_ALT = 0.015;
    const gData = useMemo(() => [...Array(N_PATHS).keys()].map(() => {
        let lat = (Math.random() - 0.5) * 90;
        let lng = (Math.random() - 0.5) * 360;
        let alt = 0;

        return [[lat, lng, alt], ...[...Array(Math.round(Math.random() * MAX_POINTS_PER_LINE)).keys()].map(() => {
            lat += (Math.random() * 2 - 1) * MAX_STEP_DEG;
            lng += (Math.random() * 2 - 1) * MAX_STEP_DEG;
            alt += (Math.random() * 2 - 1) * MAX_STEP_ALT;
            alt = Math.max(0, alt);

            return [lat, lng, alt];
        })];
    }),
        []
    );

    const getData = async () => {
        console.log("Filter in Lines");
        console.log(filter);
        const res = await api.getBirdPaths();
        if (filter.length == 4) {
            setdata(
                res.data.data.filter(row => row.tagLocalIdentifier.includes(filter)).
                    map((row) => ({
                        //Csv needs those names on the right side
                        lat: Number(row.lat),
                        lng: Number(row.lng),
                        time: Number(row.time),
                        //timestamp: row.time, macht faxen
                    }))
            );
        } else if (filter.length == 9) {
            console.log("Check for year");
            var years = filter.split('-');
            var yearFilter = new RegExp(years[0] + '-(08|09|10|11|12)-|' + years[1] + '-(01|02|03|04|05)-')
            setdata(
                res.data.data.filter(row => yearFilter.test(row.time)).
                    map((row) => ({
                        //Csv needs those names on the right side
                        lat: Number(row.lat),
                        lng: Number(row.lng),
                        time: Number(row.time),
                        //timestamp: row.time, macht faxen
                    }))
            );
        } else {
            setdata(0);
        }
    };

    return (
        <Globe
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            //globeImageUrl="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg"
            //backgroundImageUrl="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/background_milky_way.jpg"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

            labelsData={data}
            labelLat={d => d.lat}
            labelLng={d => d.lng}
            labelText={d => d.time}
            labelSize={1}
            labelDotRadius={1}
            labelColor={() => 'rgba(255, 165, 0, 0.75)'}
            labelResolution={2}
        />

    );
};

export default Marker;