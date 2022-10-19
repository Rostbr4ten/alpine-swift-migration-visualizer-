import 'antd/dist/antd.css';
import './App.css';
import {
  ArrowsAltOutlined,
  CommentOutlined,
  LineOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu, Switch, Drawer, Button } from 'antd';
import React, { useState } from 'react';
import { StaticLines, Lines, Welcome } from './pages';
import { Datepicker } from './components';
const { Header, Content, Footer, Sider } = Layout;
const items = [
  { label: 'Welcome', key: '1', icon: <CommentOutlined /> }, // remember to pass the key prop
  { label: 'Static Lines', key: '2', icon: <LineOutlined /> }, // which is required
  { label: 'Moving Lines', key: '3', icon: <ArrowsAltOutlined /> }, // which is required
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClickMenu = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const [current, setCurrent] = useState('1');
  const displayComponent = () => {
    console.log(Datepicker.dates)
    if (current === '1') {
      return <Welcome />;
    } else if (current === '2') {
      return <StaticLines />;
    } else if (current === '3') {
      return <Lines />;
    }
  };

  return (
    <Router>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" selectedKeys={[current]} onClick={onClickMenu} mode="inline" items={items} />

        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {displayComponent()}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            <div
              className="button-filter"
              style={{
                textAlign: 'right',
              }}
            >
              <Button type="primary" onClick={showDrawer}>
                Filter
              </Button>
              <Drawer title="Filter dates" placement="right" onClose={onClose} open={open}>
                <Datepicker />
              </Drawer>
            </div>
            ©2022{' '}
            <a href="https://github.com/Rostbr4ten/alpine-swift-migration-visualizer-" target="_blank" rel="noopener noreferrer">
              [Sourcecode] {' '}
            </a>
            <a href="https://www.movebank.org/cms/webapp?gwt_fragment=page%3Dstudies%2Cpath%3Dstudy1266783506" target="_blank" rel="noopener noreferrer">
              [Bird data]
            </a>
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};
export default App;