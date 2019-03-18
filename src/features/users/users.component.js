import React from 'react';
import styles from './users.module.scss';
import { Table, Avatar, Row, Col } from 'antd';

const Users = () => {

    const columns = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: avatar => <Avatar src={avatar} shape="square" size="large" />,
        },
        { title: 'Provider', dataIndex: 'provider', key: 'provider' },
        { title: 'User Name', dataIndex: 'userName', key: 'userName' },
        { title: 'Display Name', dataIndex: 'displayName', key: 'displayName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Permissions', dataIndex: 'permissions', key: 'permissions' },
    ];

    const data = [
        {
            key: 1,
            provider: 'github',
            userName: 'yberkut',
            displayName: 'Yaroslav Berkut',
            email: 'yaroslav.berkut@gmail.com',
            avatar: 'https://avatars1.githubusercontent.com/u/2784957?v=4',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            permissions: ['admin:*'],
        },
        {
            key: 2,
            provider: 'github',
            userName: 'jimGreen',
            email: 'jg@gmail.com',
            avatar: 'https://avatars3.githubusercontent.com/u/48508210?v=4',
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
            permissions: ['user:*'],
        },
        {
            key: 3,
            provider: 'github',
            userName: 'joeBlack',
            email: 'jb@gamil.com',
            avatar: 'https://avatars3.githubusercontent.com/u/48508210?v=4',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            permissions: ['user:*'],
        },
    ];

    const expandableRowRenderer = record => {
        return (
            <Row type="flex">
                <Col xs={6}><img src={record.avatar} width="100%" alt="avatar" /></Col>
                <Col xs={18}><p style={{ margin: 0 }}>{record.description}</p></Col>
            </Row>
        );
    };

    return (
        <div className={styles.root}>
            <Table
                columns={columns}
                expandedRowRender={expandableRowRenderer}
                dataSource={data}
                size="small"
            />
        </div>
    );
};

export default Users;
