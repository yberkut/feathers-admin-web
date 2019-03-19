import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import './App.scss';
import ServerConnection from './features/server-connection';
import Users from './features/users';

const { Header, Content/*, Footer*/ } = Layout;

class App extends Component {
    render() {
        return (
            <Layout className="faw-app">
                <Header>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col>Feathers Admin</Col>
                        <Col><ServerConnection /></Col>
                    </Row>

                </Header>
                <Content>
                    <Row>
                        <Col span={20} offset={2} className="content-container">
                            <Row>
                                <Col className="content-stack-item">

                                </Col>
                                <Col className="content-stack-item">
                                    <Users />
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
