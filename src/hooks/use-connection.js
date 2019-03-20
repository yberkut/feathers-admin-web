import { useState, useEffect } from 'react';
import { getFeathersClient } from '../services/feathers-client';

export const defaultConnectionInfo = 'Disconnected';

export const useConnection = () => {

    const [connectionInfo, setConnectionInfo] = useState(defaultConnectionInfo);
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        updateAuth();
    }, [user]);

    const updateAuth = async (onStart = () => {}, onDone = () => {}) => {
        try {
            onStart();

            const feathersClient = getFeathersClient();

            const jwtPayload = await feathersClient.authenticate()
                .then(response => feathersClient.passport
                    .verifyJWT(response.accessToken));
            try {
                const user = await feathersClient.service('users').get(jwtPayload.userId);

                setUser(user);
                setConnected(true);

            } catch (e) {
                setError(`User "${jwtPayload.userId}" is not found! ${error}`);
                setUser(null);
                setConnected(true);
            }
        } catch (error) {
            setError(`User is unknown ${error}`);
            setUser(null);
            window.location.replace('http://localhost:3030/auth/github');
        } finally {
            onDone();
        }
    };

    const connect = (onConnected, connectionClause = true) => {
        setError(null);

        // const feathersClient = getFeathersClient();

        if (!connectionClause) {
            setError(`connectionClause error`);
            return;
        }

        const onStart = () => {
            setLoading(true);
        };

        const onDone = () => {
            setLoading(false);
        };

        updateAuth(onStart, onDone);
        //
        // feathersClient.authenticate()
        //     .then(response => feathersClient.passport.verifyJWT(response.accessToken))
        //     .then(payload => {
        //         console.log('JWT Payload', payload);
        //         feathersClient.service('users').get(payload.userId)
        //             .then(user => {
        //                 console.log(`User is found!`, user);
        //                 setUser(user);
        //                 setConnected(true);
        //                 setLoading(false);
        //                 onConnected();
        //             })
        //             .catch(error => {
        //                 setError(`User "${payload.userId}" is not found! ${error}`);
        //                 setUser(null);
        //                 setLoading(false);
        //             });
        //     })
        //     .catch(error => { // user is not authenticated
        //         setError(`User is unknown ${error}`);
        //         setUser(null);
        //         setLoading(false);
        //         window.location.replace('http://localhost:3030/auth/github');
        //     });
    };

    const disconnect = async onDisconnected => {
        setLoading(true);
        const feathersClient = getFeathersClient();
        try {
            await feathersClient.logout();
            setLoading(false);
            setConnected(false);
            onDisconnected();
        } catch (e) {
            setError(e);
        }
    };

    return {
        connectionInfo,
        loading,
        connected,
        user,
        error,
        connect,
        disconnect,
        setConnectionInfo: info => setConnectionInfo(info || defaultConnectionInfo),
    };
};
