import { useState } from 'react';

export const defaultConnectionInfo = 'Disconnected';

export const useConnection = () => {

    const [info, setInfo] = useState(defaultConnectionInfo);
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);

    const connect = (onConnected, connectionClause = true) => {
        if (!connectionClause) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setConnected(true);
            onConnected();
        }, 500);
    };

    const disconnect = onDisconnected => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setConnected(false);
            onDisconnected();
        }, 500);
    };

    return {
        connection: {
            info,
            loading,
            connected,
        },
        connect,
        disconnect,
        setInfo: info => setInfo(info || defaultConnectionInfo),
    };
};
