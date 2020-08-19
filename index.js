const fetch = require("node-fetch");
var fs = require('fs');

var app_data;
const file_name = "data.json";

function write(data, file_name) {
  var jsonData = JSON.stringify(data);
  fs.writeFile(file_name, jsonData, function(err) {
    if (err) {
        console.log(err);
    }
  });
}

//Refer to the different constants inside constants.js
const collection = 'topselling_paid';
const category = 'FOOD_AND_DRINK';
const country = 'in';

const url = 'http://localhost:3000/api/apps/?collection='+ collection + '&category=' + category + '&country=' + country;

fetch(url)
  .then(response => response.json())
  .then(data => app_data = data)
  .then(() => console.log(Object.keys(app_data.results).length))
  .then(() => write(app_data.results, file_name))


