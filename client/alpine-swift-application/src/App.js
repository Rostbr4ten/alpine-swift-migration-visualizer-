import 'antd/dist/antd.css';
import './App.css';
import {
  ArrowsAltOutlined,
  CommentOutlined,
  LineOutlined,
  LogoutOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu, Switch, Drawer, Button, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { StaticLines, Lines, Welcome, PathLines, Marker } from './pages';
import { Datepicker } from './components';
import api from './api'
const { Header, Content, Footer, Sider } = Layout;
const { Option, OptGroup } = Select;
const items = [
  { label: 'Welcome', key: '1', icon: <CommentOutlined /> }, // remember to pass the key prop
  //{ label: 'Static Lines', key: '2', icon: <LineOutlined /> }, // which is required
  { label: 'Moving Lines', key: '3', icon: <ArrowsAltOutlined /> }, // which is required
  { label: 'PathLines', key: '4', icon: <LogoutOutlined /> }, // which is required
  { label: 'Marker', key: '5', icon: <PushpinOutlined /> }, // which is required
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [birdF, setBirdF] = React.useState(
    localStorage.getItem('birdF') || "FillterEmptyValue"
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
  const [years, setYears] = useState([]);

  useEffect(() => {
    getBirds();
    getYears();
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

const getYears = async () => {
    const res = await api.getBirdYears();
    //console.log("InGetData");
    //console.log(res.data.data);
    setYears(
      res.data.data.map((row) => ({
        //Csv needs those names on the right side
        year: row
      }))
    );
  };



  const displayComponent = () => {
    if (current === '1') {
      return <Welcome />;
    } else if (current === '2') {
      return <StaticLines />;
    } else if (current === '3') {
      return <Lines filter={birdF} />;
    } else if (current === '4') {
      return <PathLines filter={birdF} />;
    } else if (current === '5') {
      return <Marker filter={birdF} />;
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
                <Select
                  style={{
                    width: 200,
                  }}
                  onChange={handleChangeSelect}
                  defaultValue={birdF}
                >
                  <OptGroup label="Bird">
                    {birds.map((item, index) => <Select.Option value={item.bird} key={index}>{item.bird}</Select.Option>)}
                  </OptGroup>
                  <OptGroup label="Year">
                  {years.map((item, index) => <Select.Option value={item.year} key={index}>{item.year}</Select.Option>)}
                  </OptGroup>
                </Select>
                <Button type='primary' block onClick={() => window.location.reload(false)}>
                  Apply
                </Button>
              </Drawer>
            </div>
            ??2022{' '}
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

/*
                    <Option value="2014-2015">2014 - 2015</Option>
                    <Option value="2015-2016">2015 - 2016</Option>
                    <Option value="2016-2017">2016 - 2017</Option>
                    */