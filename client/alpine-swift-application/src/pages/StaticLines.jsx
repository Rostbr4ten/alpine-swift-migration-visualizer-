import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';

const StaticLines = () => {

    console.log("RegexTest");
    var regexYears = /^(((2014-(08||09||10||11||12)-(\d||-|| ||:||.)*)||(2015-(01||02||03||04||05)-(\d||-|| ||:||.)*))?)/;
    var stringTest = "16QE: 2016-12-31 07:20:11.000";
    var booly = stringTest.match(regexYears)
    var booly2 = /2014-(08|09|10|11|12)-|2015-(01|02|03|04|05)-/.test(stringTest); //0?[5-9]|1[012] // ^.*(2014-05|06|07|08|09|10|11|12)-.*
    console.log(stringTest);
    console.log(booly2);

    return (
        <p>STATIC HERE</p>
            
    );
};

export default StaticLines;