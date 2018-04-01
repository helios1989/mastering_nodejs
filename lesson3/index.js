/*
 **
 ** Primary File for the Api
 */

// Dependencies

const http = require('http'),
    https = require('https'),
    url = require('url'),
    config = require('./config'),
    fs = require('fs'),
    _data = require('./lib/data'),
    handlers = require('./lib/handlers'),
    helpers = require('./lib/helpers'),
    StringDecoder = require('string_decoder').StringDecoder;

// TESTING
// @TODO delete this
// _data.create('test', 'newFiles', { 'fizz': 'buzz' }, function(err) {
//     console.log('this was the error', err);
// });
// _data.update('test', 'newFiles', { 'fizz': 'buzz' }, function(err) {
//     console.log('this was the error', err);
// });
// _data.delete('test', 'newFiles', function(err) {
//     console.log('this was the error', err);
// });

const httpServer = http.createServer(function(req, res) {
    unifiedServer(req, res);
});

// Define a request router
const router = {
    'ping': handlers.ping,
    'users': handlers.users
};

const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};
// Http Server
httpServer.listen(config.httpPort, function() {
    console.log(`the server is listening on port ${config.httpPort} now in ${config.envName}`);
});

const httpsServer = https.createServer(httpsServerOptions, function(req, res) {
    unifiedServer(req, res);
});
// Https Server
httpsServer.listen(config.httpsPort, function() {
    console.log(`the server is listening on port ${config.httpsPort} now in ${config.envName}`);
});

const unifiedServer = (req, res) => {

    let parsedUrl = url.parse(req.url, true);
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');
    let queryStringObject = parsedUrl.query;

    let method = req.method.toLocaleLowerCase();
    let headers = req.headers;
    let decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', function(data) {
        buffer += decoder.write(data);
    })
    req.on('end', function() {
        buffer += decoder.end();

        // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {
            console.log('payload is', payload);
            // Use the status code returned from the handler, or set the default status code to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payload);
            console.log(trimmedPath, statusCode);
        });

    });
}