function route(handle, pathname) {
    console.log("About to route a request for " + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname]();
    } else {
        console.log("Не найден обработчик для события " + pathname);
    }
}

exports.route = route;
