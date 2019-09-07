const readFileData = require("../dataAccess/dataAccess");

exports.loginHandler = async (req, res) => {
    try {
        const requestWaitTime = (Math.floor(Math.random() * 3) + 1) * 1000;
        res.setTimeout(requestWaitTime, function () {
            readFileData("./data.json", req.query).then(function (data) {
                console.log('data: ', data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            }).catch(function (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(err);
            });
        });
    } catch (error) {
        console.log("error Message", error);
        return res.status(500).json({ message: JSON.stringify(error) });
    }
}

