import React, { useState } from 'react';
import styles from './server-connection.module.scss';
import { Input, Select, Button } from 'antd';
// import * as PropTypes from 'prop-types';

const Search = Input.Search;
const Option = Select.Option;

const ServerConnection = () => {

    const defaultConnectionInfo = 'Disconnected';
    const [connectionInfo, setConnectionInfo] = useState(defaultConnectionInfo);
    const [protocol, setProtocol] = useState('http://');
    const [domain, setDomain] = useState('');
    const [connected, setConnected] = useState(false);

    const protocolSelect = (
        <Select defaultValue={protocol} style={{ width: 90 }} onChange={value => setProtocol(value)}>
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    const connectClick = value => {
        if (!domain) {
            return;
        }
        setConnected(true);
        setDomain('');
        setConnectionInfo(`Connected to ${protocol}${value}`);
    };

    const disconnectClick = () => {
        setConnectionInfo(defaultConnectionInfo);
        setConnected(false);
    };

    return (
        <div className={styles.root}>
            <div className={styles.stack}>
                {connected ? (
                    <div className={styles.status}>
                        <span className={styles.connectionInfo}>{connectionInfo}</span>
                        <Button
                            type="primary"
                            shape="circle"
                            icon="logout"
                            onClick={disconnectClick}
                        />
                    </div>
                ) : (
                    <>
                        <Search
                            className={styles.search}
                            addonBefore={protocolSelect}
                            placeholder="type server to connect"
                            enterButton="Connect"
                            size="large"
                            value={domain}
                            onChange={e => setDomain(e.target.value)}
                            onSearch={connectClick}
                        />
                        <div className={styles.status}>
                            {connectionInfo}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// ServerConnection.propTypes = {
//     className: PropTypes.string,
//     children: PropTypes.oneOfType([
//         PropTypes.arrayOf(PropTypes.node),
//         PropTypes.node,
//     ]),
// };

export default ServerConnection;
