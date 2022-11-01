import React, { useState, useEffect, useRef, useMemo } from 'react'
import 'antd/dist/antd.css';
import api from '../api'
import Globe from 'react-globe.gl';

const StaticLines = ({ filter }) => {
    const [rise, setRise] = useState(false);
    const globeEl = useRef();
    const [hoverArc, setHoverArc] = useState();
    const [data, setdata] = useState([]);
    const [coords, setCoords] = useState([]);
    const [cablePaths, setCablePaths] = useState([]);

    useEffect(() => {
        setTimeout(() => setRise(true), 500);
        getData();
        console.log(data);
        //setCoords(data);
        //coords.push(data);
        console.log(coords);
        //console.log(gData);
        //console.log("-------------");
        // from https://github.com/telegeography/www.submarinecablemap.com
        fetch('//raw.githubusercontent.com/telegeography/www.submarinecablemap.com/master/web/public/api/v3/cable/cable-geo.json')
            .then(r => r.json())
            .then(cablesGeo => {
                let cablePaths = [];
                cablesGeo.features.forEach(({ geometry, properties }) => {
                    geometry.coordinates.forEach(coords => cablePaths.push({ coords, properties }));
                });
                console.log(cablePaths);
                setCablePaths(cablePaths);
            });
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
                        0: Number(row.lat),
                        1: Number(row.lng),
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
                        0: Number(row.lat),
                        1: Number(row.lng),
                        //timestamp: row.time, macht faxen
                    }))
            );
        } else {
            setdata(0);
        }
    };

    const setCoordinates = async () => {



    };

    return (
        <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pathsData={data}
            pathPoints="coords"
            pathPointLat={p => p[1]}
            pathPointLng={p => p[0]}
            pathColor={path => path.properties.color}
            pathLabel={path => path.properties.name}
            pathDashLength={0.1}
            pathDashGap={0.008}
            pathDashAnimateTime={12000}
        />

    );
};

export default StaticLines;