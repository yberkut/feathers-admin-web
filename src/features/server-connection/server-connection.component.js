import React, { useState } from 'react';
import styles from './server-connection.module.scss';
import { Input, Select, Button, Row, Col } from 'antd';
import { defaultConnectionInfo } from '../../hooks/use-connection';
import * as PropTypes from 'prop-types';

const Option = Select.Option;

const ServerConnection = ({ connectionInfo, loading, connected, connect, disconnect, setInfo }) => {

    const defaultProtocol = 'http://';
    const [protocol, setProtocol] = useState(defaultProtocol);
    const [domain, setDomain] = useState('');

    const protocolSelect = (
        <Select defaultValue={defaultProtocol} style={{ width: 90 }} onChange={value => setProtocol(value)}>
            <Option value={defaultProtocol}>{defaultProtocol}</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    const onConnected = () => {
        setInfo(`Connected to ${protocol}${domain}`);
    };

    const onDisconnected = () => {
        setInfo(defaultConnectionInfo);
        setDomain('');
        setProtocol(defaultProtocol);
    };

    return (
        <div className={styles.root}>
            <div className={styles.stack}>
                {connected ? (
                    <div className={styles.status}>
                        <span className={styles.connectionInfo}>{connectionInfo}</span>
                        <Button
                            htmlType="button"
                            type="circle"
                            icon="logout"
                            loading={loading}
                            onClick={() => disconnect(onDisconnected)}
                        />
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
                                disabled={loading}
                            />
                            <Button
                                htmlType="button"
                                className={styles.connectButton}
                                type="primary"
                                icon="login"
                                loading={loading}
                                onClick={() => connect(onConnected, !!domain)}
                            >Connect</Button>
                        </Col>
                    </Row>
                )}
            </div>
        </div>
    );
};

ServerConnection.propTypes = {
    connectionInfo: PropTypes.string,
    loading: PropTypes.bool,
    connected: PropTypes.bool,
    connect: PropTypes.func,
    disconnect: PropTypes.func,
    setInfo: PropTypes.func,
};

export default ServerConnection;
