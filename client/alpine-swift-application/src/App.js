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
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Welcome', '1', <CommentOutlined />),
  getItem('Static Lines', '2', <LineOutlined />),
  getItem('Moving Lines', '3', <ArrowsAltOutlined />),
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
  return (
    <Router>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />

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
              <Routes>
                <Route path="/" exact element={<Welcome />} />
                <Route path="/Lines" exact element={<Lines />} />
                <Route path="/StaticLines" exact element={<StaticLines />} />
              </Routes>
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
              <Drawer title="Basic Drawer" /*placement="right"*/ onClose={onClose} open={open}>
                <p>Content</p>
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