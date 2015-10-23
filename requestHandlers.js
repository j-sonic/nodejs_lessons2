var querystring = require("querystring");

function start(res, postData) {
    console.log("  Обработчик события 'start' вызван.");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<br>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
}

function upload(res, postData) {
    console.log("  Обработчик события 'upload' вызван.");
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("* You've sent: " + querystring.parse(postData).text);
    res.end();
}


exports.start = start;
exports.upload = upload;
