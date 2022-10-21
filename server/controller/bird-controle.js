var express = require('express');
var http = require('http');
var util = require('util');

const fs = require("fs");
const csv = require("csv-parser");

getBirdRoutes = (req, res) => {
    var resultObject = [];
    var birdRoutes = [];
    fs.createReadStream("./storedData/birds.csv")
        .pipe(csv())
        .on("data", (data) => resultObject.push(data))
        .on("end", () => {
            // Here we got all the timestamps and lat/lng in resultobject
            // for loop to result object .lengthg -1, get all n lng and lat as well as n + 1 lng and lat, save n timestamp
            // go on
            // return

            console.log(resultObject);

            for (let i = 0; i < (resultObject.length - 1); i++) {
                var tmpRoute = { lat1: resultObject[i].latitude, lng1:resultObject[i].longitude, 
                lat2: resultObject[i+1].latitude, lng2: resultObject[i+1].longitude,
                time: resultObject[i].timestamp };
                birdRoutes.push(tmpRoute);
            }

            console.log("BIRDROUTES");
            console.log(birdRoutes)

            return res.status(200).json({ success: true, data: birdRoutes });
        });
    // Error Handling in the future
    /*if (resultObject.length == []) {
        return res.status(404).json({ success: false, data: "Probem in CSV Parsing" });
    }*/
}

module.exports = {
    getBirdRoutes
}