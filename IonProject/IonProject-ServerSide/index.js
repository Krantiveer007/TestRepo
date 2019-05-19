var express = require('express');
var cors = require('cors')
var fs = require("fs");

var app = express();

app.use(cors({ credentials: true }));

var stream = fs.createReadStream("./data.json");

var readFileData = function (path, username) {
    return promise = new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            let responseObj = {
                status: true,
                errorMessage: ''
            };
            exitLoop = false;
            if (err) {
                reject(err);
            } else {
                JSON.parse(data).forEach(element => {
                    if (element.username.toUpperCase() === username.toUpperCase()) {
                        responseObj.status = false;
                        exitLoop = true;
                        responseObj.errorMessage = 'Error:  Username already exists';
                        reject(JSON.stringify(responseObj));
                    }
                });
                resolve(responseObj);
            }
        });
    })
}

app.get('/', function (req, res) {
    let responseObj = {
        status: true,
        errorMessage: ''
    };
    res.setTimeout((Math.floor(Math.random() * 3) + 1) * 1000, function () {
        readFileData("./data.json", req.query.username).then(function (data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        }).catch(function (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(err);
        });
    });
});

// using the listen method to make the application listen on 8082 port
var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port)
});