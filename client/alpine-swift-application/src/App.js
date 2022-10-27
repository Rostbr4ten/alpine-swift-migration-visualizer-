import 'antd/dist/antd.css';
import './App.css';
import {
  ArrowsAltOutlined,
  CommentOutlined,
  LineOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu, Switch, Drawer, Button, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { StaticLines, Lines, Welcome } from './pages';
import { Datepicker } from './components';
import api from './api'
import {reactLocalStorage} from 'reactjs-localstorage';
const { Header, Content, Footer, Sider } = Layout;
const { Option, OptGroup } = Select;
const items = [
  { label: 'Welcome', key: '1', icon: <CommentOutlined /> }, // remember to pass the key prop
  { label: 'Static Lines', key: '2', icon: <LineOutlined /> }, // which is required
  { label: 'Moving Lines', key: '3', icon: <ArrowsAltOutlined /> }, // which is required
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [birdF, setBirdF] = React.useState(
    localStorage.getItem('birdF') || "12IS"
  );
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClickMenu = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    localStorage.setItem('current', e.key);
  };
  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
    setBirdF(value);
    localStorage.setItem('birdF', value);
    displayComponent(value);
  };
  const [current, setCurrent] = React.useState(
    localStorage.getItem('current') || '1'
  );
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    getBirds();
  }, []);

  const getBirds = async () => {
    const res = await api.getBirdFilters();
    //console.log("InGetData");
    //console.log(res.data.data);
    setBirds(
      res.data.data.map((row) => ({
        //Csv needs those names on the right side
        bird: row
      }))
    );
  };


  const displayComponent = ( filter ) => {
    //console.log(Datepicker.dates)
    if (current === '1') {
      return <Welcome />;
    } else if (current === '2') {
      return <StaticLines />;
    } else if (current === '3') {
      return <Lines filter={ birdF } />;
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
              {displayComponent(birdF)}
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
                <Select
                  defaultValue="12IS"
                  style={{
                    width: 200,
                  }}
                  onChange={handleChangeSelect}
                >
                  <OptGroup label="Bird">
                    {birds.map((item, index) => <Select.Option value={item.bird} key={index}>{item.bird}</Select.Option>)}
                  </OptGroup>
                  <OptGroup label="Year">
                    <Option value="2014-2015">2014 - 2015</Option>
                    <Option value="2015-2016">2015 - 2016</Option>
                    <Option value="2016-2017">2016 - 2017</Option>
                  </OptGroup>
                </Select>
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

// <Datepicker /> in Drawer