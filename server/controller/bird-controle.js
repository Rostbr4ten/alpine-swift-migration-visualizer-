var express = require('express');
var http = require('http');
var util = require('util');

const fs = require("fs");
const csv = require("csv-parser");

getBirdRoutes = (req, res) => {
    var resultObject = [];
    fs.createReadStream("./storedData/birds.csv")
        .pipe(csv())
        .on("data", (data) => resultObject.push(data))
        .on("end", () => {
            var resultObject2 = resultObject.shift();
            return res.status(200).json({ success: true, data: resultObject });
        });
    // Error Handling in the future
    /*if (resultObject.length == []) {
        return res.status(404).json({ success: false, data: "Probem in CSV Parsing" });
    }*/
}

module.exports = {
    getBirdRoutes
}