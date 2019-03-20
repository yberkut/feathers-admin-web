import auth     from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io       from 'socket.io-client';

const feathersApiUri = 'localhost:3030';

let feathersClient = null;

const createFeathersClient = () => {
    const socket = io(feathersApiUri, {
        transports: ['websocket']
    });
    const app = feathers();

    app.configure(socketio(socket));

    // The transports plugins (Rest, Socket, Primus...) must have been initialized previously to the authentication plugin
    app.configure(auth({
        storage: window.localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
    }));

    return app;
};

export const getFeathersClient = () => {
    if (!feathersClient) {
        feathersClient = createFeathersClient();
    }
    return feathersClient;
};
