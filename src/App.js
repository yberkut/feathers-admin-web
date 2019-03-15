import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import './App.scss';
import ServerConnection from './features/server-connection';
import UsersDashboard from './features/users-dashboard';

const { Header, Content/*, Footer*/ } = Layout;

class App extends Component {
    render() {
        return (
            <Layout className="faw-app">
                <Header>Feathers Admin</Header>
                <Content>
                    <Row>
                        <Col span={20} offset={2} className="content-container">
                            <Row>
                                <Col className="content-stack-item">
                                    <ServerConnection />
                                </Col>
                                <Col className="content-stack-item">
                                    <UsersDashboard />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Content>
                {/*<Footer>Footer</Footer>*/}
            </Layout>
        );
    }
}

export default App;
