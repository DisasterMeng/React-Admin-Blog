import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

import './style.css'

const menus = [
  {
    id: 1,
    title: '首页',
    icon: 'user',
    link: '/'
  },
  {
    id: 2,
    title: '博客管理',
    icon: 'user',
    link: '/blog'
  },
  {
    id: 3,
    title: '类别管理',
    icon: 'user',
    link: '/'
  },
  {
    id: 4,
    title: '友链管理',
    icon: 'user',
    link: '/'
  },
  {
    id: 5,
    title: '图片管理',
    icon: 'user',
    link: '/'
  },
  {
    id: 6,
    title: '关于',
    icon: 'user',
    link: '/'
  }
]

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      check: '1'
    }
  }

  renderMenu(item) {
    return (
      <Menu.Item key={item.id}>
        <Icon type={item.icon} />
        {item.title}
        <Link to={item.link} />
      </Menu.Item>
    )
  }

  handleClick = e => {
    this.setState({
      check: e.key
    })
  }

  render() {
    return (
      <div>
        <div className="nav-header">dddd</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[this.state.check]}
          defaultSelectedKeys={[this.state.check]}
          onClick={this.handleClick}
        >
          {menus.map(item => this.renderMenu(item))}
        </Menu>
      </div>
    )
  }
}

export default Nav
