var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log("Запрос для '" + pathname + "' получен.");

        route(handle, pathname);

        res.writeHead(200, {"Content-type": "text/plain"});
        res.write("Привет, мир!");
        res.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Сервер запущен.");
}

exports.start = start;
