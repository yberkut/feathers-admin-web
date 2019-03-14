import React, { Component } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import './App.scss';

const { Header, Content/*, Footer*/ } = Layout;

class App extends Component {
    render() {
        return (
            <Layout className="faw-app">
                <Header>Feathers Admin</Header>
                <Content>
                    <Row>
                        <Col span={20} offset={2} className="content-container">
                            <Button type="primary" size="large">
                                Get Started ➤
                            </Button>
                        </Col>
                    </Row>
                </Content>
                {/*<Footer>Footer</Footer>*/}
            </Layout>
        );
    }
}

export default App;
