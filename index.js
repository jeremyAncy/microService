var express = require('express');

var app = express();

const PORT = 8080;

console.log('run server on port : ' + PORT);

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');

    objectTest = {
        test: 1234
    }
    res.send(objectTest);
});

app.listen(PORT);