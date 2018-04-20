var express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
var url = require('url');

var app = express();

const PORT = 9627;
var adr = '';

console.log('run server on port : ' + PORT);

app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');

    objectTest = {
        test: 1234
    }
    res.send(objectTest);
});

app.get('/image/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    if (req.query.url == null) {
        var error = true;
        var description = "error url";
        var element = { error: error, description: description };
        json.push(element);
        return res.send(json);
    }
    else
        adr = req.query.url;

    var q = url.parse(adr, true);
    const options = {
        uri: adr,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options)
        .then(($) => {
            var json = [];
            var jsonFinal = [];
            var altTotal = 0;
            var altNovide = 0;
            $('img').each(function (i, elem) {
                var src = $(this).attr('src').trim();
                var subSrc = $(this).attr('src').trim().substr(0, 4);

                altTotal ++;
                if($(this).attr('alt') == null){
                   
                } else if($(this).attr('alt') != ""){
                    altNovide++;
                }
               /* if (subSrc == "http" || src.indexOf(".com") != -1) {
                    var alt = $(this).attr('alt');
                    var element = { source: src, alt: alt };
                    json.push(element);
                } else if (subSrc == "data") {
                    var b64 = true;
                    var alt = $(this).attr('alt');
                    var element = { base64: b64, source: src, alt: alt };
                    json.push(element);
                } else if(src.indexOf(".jpg") != -1 || src.indexOf(".png") != -1){
                    q.host;
                    src = q.host + $(this).attr('src').trim();
                    var alt = $(this).attr('alt');
                    var element = { source: src, alt: alt };
                    json.push(element);
                }else {
                    console.log(subSrc);
                    console.log($(this).attr('src'));
                }*/
            });

            var kpi = altNovide / altTotal;
            var element = { KPI_ALT: kpi/*, IMAGE: json*/ };
            //jsonFinal.push(element);
            res.send(element);
        })
        .catch((err) => {
            var error = true;
            var description = "error url";
            var element = { error: error, description: description };
            json.push(element);
            return res.send(json);
        });
});

app.get('/title/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    if (req.query.url == null) {
        var error = true;
        var description = "error url";
        var element = { error: error, description: description };
        json.push(element);
        return res.send(json);
    }
    else
        adr = req.query.url;

    var q = url.parse(adr, true);

    var json = [];

    const options = {
        uri: adr,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            $('title').each(function (i, elem) {
                var src = q.host;
                var title = $(this).text();
                var element = { source: src, title: title };
                json.push(element);
            });
            res.send(json);
        })
        .catch((err) => {
            var error = true;
            var description = "error url";
            var element = { error: error, description: description };
            json.push(element);
            return res.send(json);
        });


});

app.listen(PORT);