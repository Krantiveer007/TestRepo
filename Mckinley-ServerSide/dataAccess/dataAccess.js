
var fs = require('fs');

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

module.exports = readFileData;