import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import './App.scss';
import ServerConnection from './features/server-connection';
import Users from './features/users';
import { useConnection } from './hooks/use-connection';

const { Header, Content/*, Footer*/ } = Layout;
const { Text } = Typography;

const App = () => {

    const {
        connection: { info: connectionInfo, loading, connected },
        connect,
        disconnect,
        setInfo,
    } = useConnection();

    return (
        <Layout className="faw-app">
            <Header>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        Feathers Admin
                    </Col>
                    <Col>
                        <ServerConnection
                            connectionInfo={connectionInfo}
                            loading={loading}
                            connected={connected}
                            connect={connect}
                            disconnect={disconnect}
                            setInfo={setInfo}
                        />
                    </Col>
                </Row>
            </Header>
            <Content>
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
