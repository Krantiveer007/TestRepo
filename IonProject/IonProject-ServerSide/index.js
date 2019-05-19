var express = require('express');
var cors = require('cors')
var fs = require('fs');

var app = express();

app.use(cors({ credentials: true }));

var readFileData = function (path, queryParam) {
    return promise = new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            let responseObj = {
                status: false,
                errorMessage: '',
                errorParam: ''
            };
            let usernameFoundCount = 0;
            if (err) {
                reject(err);
            } else {
                JSON.parse(data).every(element => {
                    if (element.username === queryParam.username) {
                        if (element.password === queryParam.password) {
                            responseObj.status = true;
                            responseObj.errorMessage = '';
                            responseObj.errorParam = '';
                            resolve(responseObj);
                        } else {
                            usernameFoundCount++;
                            responseObj.status = false;
                        }
                    } else {
                        responseObj.status = false;
                        responseObj.errorParam = 'username';
                        responseObj.errorMessage = 'Error: Username Not Found'
                    }
                    if (responseObj.status) {
                        return false;
                    } else {
                        return true;
                    }
                });
                if (usernameFoundCount > 0 && responseObj.status === false) {
                    responseObj.errorParam = 'password';
                    responseObj.errorMessage = 'Error: Incorrect Password';
                    reject(JSON.stringify(responseObj));
                } else if (responseObj.status === false) {
                    reject(JSON.stringify(responseObj));
                }
            }
        });
    })
}

app.get('/', function (req, res) {
    const requestWaitTime = (Math.floor(Math.random() * 3) + 1) * 1000;
    res.setTimeout(requestWaitTime, function () {
        readFileData("./data.json", req.query).then(function (data) {
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