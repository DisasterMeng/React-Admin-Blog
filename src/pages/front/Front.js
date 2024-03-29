import React from 'react'
import { Layout, Icon } from 'antd'
import { Switch, Route, } from 'react-router-dom'


import Nav from '../menu/Menu'
import Home from '../home/Home'

import Image from '../image/Image'

import Blog from '../blog/Blog'
import Add from '../blog/Add'
// import Publish from '../blog/Publish'


import CategoryManage from '../category/Manage'

import TagManage from '../tag/Manage'
import FriendManage from '../friend/Manage'

import './style.css'

const { Header, Sider, Content } = Layout

class Front extends React.Component {


  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Layout className="main-container">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <Nav />
        </Sider>
        <Layout>
          <Header className="header-container">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/blog-list' component={Blog} />
              <Route exact path="/blog-add" component={Add} />

           
            
              <Route exact path='/category' component={CategoryManage} />


              <Route exact path='/tag' component={TagManage} />

              <Route exact path='/friend' component={FriendManage} />

              <Route exact path='/image' component={Image} />
             

             
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Front
