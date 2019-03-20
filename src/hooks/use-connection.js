import { useState, useEffect } from 'react';
import { getFeathersClient } from '../services/feathers-client';

export const useConnection = () => {

    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const [disconnected, setDisconnected] = useState(false);
    const [uri, setUri] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uri) {
            const storageUri = getUriFromStorage();
            storageUri && setUri(storageUri);
        } else if (uri && !disconnected) {
            updateAuth(uri, onStart, onDone);
        }
    }, [uri, connected, disconnected]);

    const doOAuthLogin = () => {
        // window.location.replace('http://localhost:3030/auth/github');
    };

    const addUriToStorage = uri => {
        window.localStorage.setItem('serverUri', uri);
    };

    const getUriFromStorage = () => {
        return window.localStorage.getItem('serverUri');
    };

    const removeUriFromStorage = () => {
        window.localStorage.removeItem('serverUri');
    };

    const updateAuth = async (uri, onStart, onDone) => {

        if (!uri) {
            setError('URI should be defined to establish connection with a server!');
            return;
        }

        let feathersClient;
        try {
            feathersClient = getFeathersClient(uri).app;
        } catch (error) {
            setError(error);
            return;
        }

        try {
            onStart();

            const jwtPayload = await feathersClient.authenticate()
                .then(response => feathersClient.passport
                    .verifyJWT(response.accessToken));
            try {
                const user = await feathersClient.service('users').get(jwtPayload.userId);

                setUser(user);
                setConnected(true);
                setDisconnected(false);

            } catch (e) {
                setError(`User "${jwtPayload.userId}" is not found! ${error}`);
                setUser(null);
                setConnected(false);
            }
        } catch (error) {
            setUser(null);
            doOAuthLogin();
        } finally {
            onDone();
        }
    };

    const onStart = () => {
        setLoading(true);
    };

    const onDone = () => {
        setLoading(false);
    };

    const connect = (uri, onConnected, connectionClause = true) => {
        setError(null);
        setDisconnected(false);

        if (!uri) {
            setError('You have to provide URI!');
            return;
        }

        addUriToStorage(uri);
        setUri(uri);

        if (!connectionClause) {
            setError(`connectionClause error`);
            return;
        }

        updateAuth(uri, onStart, onDone);
    };

    const disconnect = async (uri, onDisconnected) => {
        removeUriFromStorage();
        setLoading(true);
        const feathersClient = getFeathersClient(uri).app;
        try {
            setDisconnected(true);
            await feathersClient.logout();
            setLoading(false);
            setConnected(false);
            setUri(null);
            onDisconnected();
        } catch (e) {
            setError(e);
        }
    };

    return {
        loading,
        connected,
        uri,
        user,
        error,
        connect,
        disconnect,
    };
};
