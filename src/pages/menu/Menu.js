import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

import './style.css'
const SubMenu = Menu.SubMenu

class Nav extends React.Component {
  state = {
    check: 'home',
    menus:[
      {
        id: 'home',
        title: '首页',
        icon: 'user',
        path: '/'
      },
      {
        id: 'blog',
        title: '博客管理',
        icon: 'user',
        subMenus: [
          {
            id: 'blogList',
            title: '列表',
            icon: 'user',
            path: '/blog-list'
          },
          {
            id: 'blogAdd',
            title: '添加',
            icon: 'user',
            path: '/blog-add'
          }
        ]
      },
      {
        id: 'publish',
        title: '发布博客',
        icon: 'user',
        path: '/publish'
      },
      {
        id: 'category',
        title: '类别管理',
        icon: 'user',
        path: '/category'
      },
      {
        id: 'tag',
        title: '标签管理',
        icon: 'user',
        path: '/tag'
      },
      
      {
        id: 'friend',
        title: '友链管理',
        icon: 'user',
        subMenus: [
          {
            id: 'friendList',
            title: '列表',
            icon: 'user',
            path: '/friend-list'
          },
          {
            id: 'friendAdd',
            title: '添加',
            icon: 'user',
            path: '/friend-add'
          }
        ]
      }
    ]
  }


  handleClick = e => {
    this.setState({
      check: e.key
    })
  }

  router = ()=>{
    
    const r = (item)=>{
      if(window.location.href.includes(item.path)){
       this.setState({
         check: item.id
       })
      }
    }

    this.state.menus.map(m=>{
      r(m)
      if(m.subMenus) m.subMenus.map(m=>r(m))
    })
   
  }

  componentWillMount() {
    console.log(window.location.href)
    

    this.router()
  
  
  }

  render() {
   

    const renderMenu=(item)=> {
      const renderItem = item => (
        <Menu.Item key={item.id}>
          <Icon type={item.icon} />
          <span>{item.title}</span>
          
          <Link to={item.path} />
        </Menu.Item>
      )
  
      if (item.subMenus) {
        return (
          <SubMenu
            key={item.id}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {item.subMenus.map(sub => renderItem(sub))}
          </SubMenu>
        )
      }
      return renderItem(item)
    }

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
          {this.state.menus.map(item => renderMenu(item))}
        </Menu>
      </div>
    )
  }
}

export default Nav
