import React from 'react';
import { Layout, Row, Col, Typography, Alert } from 'antd';
import './App.scss';
import ServerConnection from './features/server-connection';
import Users from './features/users';
import { useConnection } from './hooks/use-connection';

const { Header, Content/*, Footer*/ } = Layout;
const { Text } = Typography;

const App = () => {

    const {
        connectionInfo,
        loading,
        connected,
        connect,
        disconnect,
        setConnectionInfo,
        user,
        error,
    } = useConnection();

    return (
        <Layout className="faw-app">
            <Header>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        Feathers Admin
                    </Col>
                    {user && (
                        <Col>
                            Hello, {user.displayName} ;)
                        </Col>
                    )}
                    <Col>
                        <ServerConnection
                            connectionInfo={connectionInfo}
                            loading={loading}
                            connected={connected}
                            connect={connect}
                            disconnect={disconnect}
                            setConnectionInfo={setConnectionInfo}
                        />
                    </Col>
                </Row>
            </Header>
            <Content>
                {error && <Alert type="error" message={error} banner closable />}
                <Row>
                    <Col span={20} offset={2} className="content-container">
                        <Row>
                            <Col className="content-stack-item">
                                {connected
                                    ? <Users />
                                    : (
                                        <Row type="flex" justify="center">
                                            <Text type="warning">Server is disconnected</Text>
                                        </Row>
                                    )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
            {/*<Footer>Footer</Footer>*/}
        </Layout>
    );
};

export default App;
