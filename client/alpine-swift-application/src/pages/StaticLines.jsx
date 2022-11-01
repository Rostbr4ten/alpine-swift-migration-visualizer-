import React, { useState, useEffect, useRef, useMemo } from 'react'
import 'antd/dist/antd.css';
import api from '../api'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//import "../node_modules/leaflet/dist/leaflet.css";
import HeatmapLayer from "react-leaflet-heatmap-layer";

const StaticLines = ({ filter }) => {

    const [rise, setRise] = useState(false);
    const [hoverArc, setHoverArc] = useState();
    const [data, setdata] = useState([]);

    useEffect(() => {
        setTimeout(() => setRise(true), 500);
        getData();
        console.log([data]);
    }, []);

    const geojson = {
        type: "FeatureCollection",
        crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        features: [
            {
                type: "Feature",
                properties: {
                    NAME: "Орехово-Зуевский район",
                    OKATO_NAME: "Орехово-Зуевский район",
                    OKTMO_NAME: "Орехово-Зуевский муниципальный район"
                },
                geometry: {
                    type: "Point",
                    coordinates: [39.050619679238508, 55.664990339319459]
                }
            },
            {
                type: "Feature",
                properties: {
                    NAME: "Молодёжный",
                    OKATO_NAME: "Молодежный",
                    OKTMO_NAME: "Поселок Молодежный (ЗАТО)"
                },
                geometry: {
                    type: "Point",
                    coordinates: [36.804726580056425, 55.327391214040745]
                }
            },
            {
                type: "Feature",
                properties: {
                    NAME: "Павлово-Посадский район",
                    OKATO_NAME: "Павлово-Посадский район",
                    OKTMO_NAME: "Павлово-Посадский муниципальный район"
                },
                geometry: {
                    type: "Point",
                    coordinates: [38.677575326793274, 55.767798037723409]
                }
            },
            {
                type: "Feature",
                properties: {
                    NAME: "Коломенский район",
                    OKATO_NAME: "Коломенский район",
                    OKTMO_NAME: "Коломенский муниципальный район"
                },
                geometry: {
                    type: "Point",
                    coordinates: [38.764793791552123, 55.112493529690383]
                }
            },
            {
                type: "Feature",
                properties: {
                    NAME: "Каширский район",
                    OKATO_NAME: "Каширский район",
                    OKTMO_NAME: "Каширский муниципальный район"
                },
                geometry: {
                    type: "Point",
                    coordinates: [38.287461597995204, 54.758055728752645]
                }
            },
            {
                type: "Feature",
                properties: {
                    NAME: "Подольский район",
                    OKATO_NAME: "Подольский район",
                    OKTMO_NAME: "Подольский муниципальный район"
                },
                geometry: {
                    type: "Point",
                    coordinates: [37.550270141776821, 55.375993741785777]
                }
            },
            {
                type: "Feature",
                properties: {
                    NAME: "Чеховский район",
                    OKATO_NAME: "Чеховский район",
                    OKTMO_NAME: "Чеховский муниципальный район"
                },
                geometry: {
                    type: "Point",
                    coordinates: [37.428490073054967, 55.148457844591881]
                }
            },
            {
                type: "Feature",
                properties: {
                    NAME: "Солнечногорский район",
                    OKATO_NAME: "Солнечногорский район",
                    OKTMO_NAME: "Солнечногорский муниципальный район"
                },
                geometry: {
                    type: "Point",
                    coordinates: [37.061604135674493, 56.121217521674517]
                }
            }
        ]
    };

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
                        2: Number(row.alt),
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
                        2: Number(row.alt),
                        //timestamp: row.time, macht faxen
                    }))
            );
        } else {
            setdata(0);
        }
    };

    return (
        <MapContainer center={[-8.12030075187975, 3.60000000000001]} zoom={13}>
            <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={geojson}
                longitudeExtractor={m => m.geometry.coordinates[0]}
                latitudeExtractor={m => m.geometry.coordinates[1]}
                intensityExtractor={m => parseFloat(m.geometry.coordinates[1])}
            />

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
        </MapContainer>

    );
};

export default StaticLines;