import React, { useState } from 'react';
import styles from './server-connection.module.scss';
import { Input, Select, Button, Row, Col } from 'antd';
// import * as PropTypes from 'prop-types';

const Option = Select.Option;

const ServerConnection = () => {

    const defaultConnectionInfo = 'Disconnected';
    const [connectionInfo, setConnectionInfo] = useState(defaultConnectionInfo);
    const [protocol, setProtocol] = useState('http://');
    const [domain, setDomain] = useState('');
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const protocolSelect = (
        <Select defaultValue={protocol} style={{ width: 90 }} onChange={value => setProtocol(value)}>
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    const connectClick = () => {
        if (!domain) {
            return;
        }
        setConnecting(true);
        setTimeout(() => {
            setConnecting(false);
            setConnected(true);
            setConnectionInfo(`Connected to ${protocol}${domain}`);
            setDomain('');
        }, 1000);
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
                            icon="logout"
                            onClick={disconnectClick}
                        >Disconnect</Button>
                    </div>
                ) : (
                    <Row>
                        <Col>
                        <Input
                            className={styles.connectInput}
                            addonBefore={protocolSelect}
                            placeholder="type server to connect"
                            value={domain}
                            onChange={e => setDomain(e.target.value)}
                            disabled={connecting}
                        />
                        <Button
                            className={styles.connectButton}
                            type="primary"
                            icon="login"
                            loading={connecting}
                            onClick={connectClick}
                        >Connect</Button>
                        </Col>
                        <div className={styles.status}>
                            {connectionInfo}
                        </div>
                    </Row>
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
