import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const feathersClients = [];

const createFeathersClient = uri => {

    const socket = io(uri, {
        transports: ['websocket'],
    });
    const app = feathers();

    app.configure(socketio(socket));

    // The transports plugins (Rest, Socket, Primus...) must have been initialized previously to the authentication plugin
    app.configure(auth({
        storage: window.localStorage, // Passing a WebStorage-compatible object to enable automatic storage on the client.
    }));

    const feathersClient = { uri, app };
    feathersClients.push(feathersClient);

    return feathersClient;
};

const findFeathersClient = uri => feathersClients.find(client => client.uri === uri);

export const getFeathersClient = uri => {

    let feathersClient = findFeathersClient(uri);
    if (!feathersClient) {
        feathersClient = createFeathersClient(uri);
    }
    return feathersClient;
};
