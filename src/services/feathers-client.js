import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const feathersClients = [];

const createFeathersClient = uri => {

    return new Promise((resolve, reject) => {
        const socket = io(uri, {
            transports: ['websocket'],
        });

        socket.io.reconnectionAttempts(3);

        // on reconnection, reset the transports option, as the Websocket
        // connection may have failed (caused by proxy, firewall, browser, ...)
        // socket.on('reconnect_attempt', () => {
        //     socket.io.opts.transports = ['polling', 'websocket'];
        // });

        const app = feathers();

        app.configure(socketio(socket));

        // The transports plugins (Rest, Socket, Primus...) must have been initialized previously to the authentication plugin
        app.configure(auth({
            storage: window.localStorage, // Passing a WebStorage-compatible object to enable automatic storage on the client.
        }));

        socket.on('connect', () => {
            feathersClients.push({ uri, app });
            resolve(app);
        });

        socket.on('reconnect_error', () => {
            socket.disconnect();
            reject(`Can't establish socket connection to ${uri}`);
        });
    });
};

const findFeathersClient = uri => feathersClients.find(client => client.uri === uri);

export const getFeathersClient = uri => {

    return new Promise(async (resolve, reject) => {

        let feathersClient = (findFeathersClient(uri) || {}).app;

        if (feathersClient) {
            resolve(feathersClient);
            return;
        }

        try {
            feathersClient = await createFeathersClient(uri);
            resolve(feathersClient);
        } catch (error) {
            reject(error);
        }
    });
};
