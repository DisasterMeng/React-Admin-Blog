import React from 'react'
import { Layout, Icon } from 'antd'
import { Switch, Route, } from 'react-router-dom'


import Nav from '../menu/Menu'
import Home from '../home/Home'
import Friend from '../friend/Friend'
import Image from '../image/Image'
import Category from '../category/Category'
import Blog from '../blog/Blog'
import Add from '../blog/add/Add'


import './style.css'

const { Header, Sider, Content } = Layout

class Front extends React.Component {
  //   constructor(props) {
  //     super(props)
  //   }

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
              <Route exact path='/blog' component={Blog} />
              <Route exact path='/friend' component={Friend} />
              <Route exact path='/image' component={Image} />
              <Route exact path='/category' component={Category} />
              <Route exact path="/blog/add" component={Add} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Front
