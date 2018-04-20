var express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
var url = require('url');

var app = express();

const PORT = 9627;
const adr = 'http://igg-games.com/';

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

app.get('/image/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');


    
    var q = url.parse(adr, true);

    objectTest = {
        test: 1234
    }

    var json = [];

    const options = {
        uri: adr,
        transform: function (body) {
          return cheerio.load(body);
        }
      };

      rp(options)
      .then(($) => {
        //console.log($);
        $('img').each(function(i, elem) {
            var src = "";
            var subSrc = $(this).attr('src').trim().substr(0, 4);
            console.log(subSrc);
            if(subSrc == "http" || subSrc.indexOf(".com")){
                src = $(this).attr('src');
                var src = $(this).attr('src').trim();
                var alt = $(this).attr('alt');
                var element = {source: src, alt: alt};
                json.push(element);
            } else if (subSrc == "data"){
                var b64 = true;
                var src = $(this).attr('src');
                var alt = $(this).attr('alt');
                var element = {base64:b64,source: src, alt: alt};
                json.push(element);
            } else {
                console.log($(this).attr('src'));
            }
            
          });
          res.send(json);
      })
      .catch((err) => {
        console.log(err);
      });

    
});

app.get('/title/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');

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
        $('title').each(function(i, elem) {
            var src = q.host;
            var title = $(this).text();
            var element = {source: src, title: title};
            json.push(element);
          });
          res.send(json);
      })
      .catch((err) => {
        console.log(err);
      });

    
});

app.listen(PORT);