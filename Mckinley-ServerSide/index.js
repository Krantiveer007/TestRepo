const app = require("./app");

app.set('port', 8082);
// using the listen method to make the application listen on 8082 port
var server = app.listen(app.get("port"), () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port)
});