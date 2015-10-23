var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(res, req) {
    console.log("  Обработчик события 'start' вызван.");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload">'+'<br>'+'<br>'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
}


function upload(res, req) {
    console.log("  Обработчик события 'upload' вызван.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(req, function(error, fields, files) {
        console.log("parsing done!");
        fs.rename(files.upload.path, "C:/TEMP/test.jpg", function(err) {
            if (err) {
                fs.unlink("C:/TEMP/test.jpg");
                fs.rename(files.upload.path, "C:/TEMP/test.jpg");
            }
        });
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("* received image:<br/>");
        res.write("<img src='/show' style='max-width: 100%; height: 94%; border: 3px solid #EB1B24;'/>");
        res.end();
    });


}


function show(res, postData) {
    console.log("  Обработчик события 'show' вызван.");
    fs.readFile("C:/TEMP/test.jpg", "binary", function(error, file) {
        if (error) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(error + "\n");
            res.end();
        } else {
            //res.writeHead(200, {"Content-Type": "text/plain"});
            //res.write("Моя картинка:" + "\n");
            res.writeHead(200, {"Content-Type": "image/jpeg"});
            res.write(file, "binary");
            res.end();
        }
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;
