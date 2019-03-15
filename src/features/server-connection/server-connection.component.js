import React, { useState } from 'react';
import styles from './server-connection.module.scss';
import { Input, Select } from 'antd';
// import * as PropTypes from 'prop-types';

const Search = Input.Search;
const Option = Select.Option;

const ServerConnection = () => {

    const [connectedTo, setConnectedTo] = useState('Disconnected');
    const [protocol, setProtocol] = useState('http://');
    const [domain, setDomain] = useState('');

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
        setConnectedTo(`Connected to ${protocol}${value}`);
        setDomain('');
    };

    return (
        <div className={styles.root}>
            <div className={styles.stack}>
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
                    {connectedTo}
                </div>
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
