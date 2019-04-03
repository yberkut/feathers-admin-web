import React, { useState } from 'react';
import styles from './server-connection.module.scss';
import { Input, Select, Button, Row, Col } from 'antd';
import * as PropTypes from 'prop-types';

const Option = Select.Option;

const ServerConnection = ({ loading, connected, uri, connect, disconnect }) => {

    const defaultProtocol = 'http://';
    const defaultDomain = 'localhost:3030';

    const [protocol, setProtocol] = useState(defaultProtocol);
    const [domain, setDomain] = useState(defaultDomain);

    const protocolSelect = (
        <Select defaultValue={defaultProtocol} style={{ width: 90 }} onChange={value => setProtocol(value)}>
            <Option value={defaultProtocol}>{defaultProtocol}</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    const onDisconnected = () => {
        setDomain(defaultDomain);
        setProtocol(defaultProtocol);
    };

    const renderDisconnectedMode = () => (
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
                    onClick={() => connect(`${protocol}${domain}`, !!domain)}
                >Connect</Button>
            </Col>
        </Row>
    );

    const renderConnectedMode = () => (
        <div className={styles.status}>
            <span className={styles.connectionInfo}>Connected to {uri}</span>
            <Button
                htmlType="button"
                type="circle"
                icon="logout"
                loading={loading}
                onClick={() => disconnect(uri, onDisconnected)}
            />
        </div>
    );

    return (
        <div className={styles.root}>
            <div className={styles.stack}>
                {connected ? renderConnectedMode() : renderDisconnectedMode()}
            </div>
        </div>
    );
};

ServerConnection.propTypes = {
    loading: PropTypes.bool,
    connected: PropTypes.bool,
    uri: PropTypes.string,
    connect: PropTypes.func,
    disconnect: PropTypes.func,
};

export default ServerConnection;
