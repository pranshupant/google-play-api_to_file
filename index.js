const fetch = require("node-fetch");
const fs = require('fs');
const constants = require("./constants.js");

var app_data;
const file_name = "data.json";

function write(data, file_name) {
  var jsonData = JSON.stringify(data);
  fs.writeFile(file_name, jsonData, (err) => {
    if (err) {
        console.log(err);
    }
  });
}

//Refer to the different constants inside constants.js
const collection = constants.collection.TOP_PAID;
const category = constants.category.FOOD_AND_DRINK;
const country = 'in';

console.log('Writing Collection: '+ collection);
console.log('Category: ' + category);
console.log('Country: ' + country);
console.log('To: ' + file_name);

const url = 'http://localhost:3000/api/apps/?collection='+ collection + '&category=' + category + '&country=' + country;

fetch(url)
  .then(response => response.json())
  .then(data => app_data = data)
  .then(() => console.log('Number of entries = ' + Object.keys(app_data.results).length))
  .then(() => write(app_data.results, file_name))
  .catch(err => {
    console.log(err);
  });