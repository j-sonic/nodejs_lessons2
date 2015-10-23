function route(handle, pathname, res, postData) {
    console.log("  route a request for " + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](res, postData);
    } else {
        console.log("  Не найден обработчик для события " + pathname);
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("  404 Not found");
        res.end();
    }
}


exports.route = route;
