import hapi  from 'hapi';
import path  from 'path';
import inert from 'inert';

let log  = require('bows')('HapiServer');

let server = new hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, '/')
            }
        }
    }
});
server.connection({ port: 8080 });

server.register(inert, function () {});

server.route({
    method: 'GET',
    path: '/info.json',
    handler: function (request, reply) {
            reply.file('info.json');
        }
});

server.route({
    method: 'GET',
    path: '/home',
    handler: function (request, reply) {
            reply.file('index.html');
        }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});


server.start(function (err) {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});