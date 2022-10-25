import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import api from '../api'
import Globe from 'react-globe.gl';

const Lines = ( {filter} ) => {
    const globeEl = useRef();
    const [hoverArc, setHoverArc] = useState();
    // data = get all datasets
    const [data, setdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // Is immediatly triggered, fills data up
    useEffect(() => {
        getData();
        globeEl.current.pointOfView({ lat: 45.8, lng: 17.3, altitude: 0.7 });
    }, []);

    const getData = async () => {
        console.log("Filter in Lines");
        console.log(filter);
        const res = await api.getBirdRoutes();
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
        //filterData(data);
    };

    
    const filterData = (data) => {
        console.log("Filter Data!");
        console.log(filter);
        console.log(data);
    };
    /*

    // Map the ids of datasets and mlmodels stored in training configs to their names
    const trainingConfigMoreInfo = trainingConfig.map(training => ({
        ...training,
        dataset_name: datasets.find(dataset => dataset._id == training.dataset_id)?.name,
        ml_model_name: mlmodels.find(mlmodel => mlmodel._id == training.ml_model_id)?.name,
    }));
    */

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