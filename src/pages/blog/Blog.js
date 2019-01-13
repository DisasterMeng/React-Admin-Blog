import React from 'react'
import { Table, Tag, Button } from 'antd'
import {Link} from 'react-router-dom'

import Http from '../../utils/Http'


class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: []
    }
  }

  columns = _ => [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '类别',
      dataIndex: 'category.name'
    },
    {
      title: '阅读量',
      dataIndex: 'page_view'
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => (
            <Tag color="blue" key={tag.id}>
              {tag.name}
            </Tag>
          ))}
        </span>
      )
    },
    {
      title: '操作',
      dataIndex: '',
      render: _ => (
        <span>
          <Button type="primary" shape="circle" icon="search" />
          <Button type="primary" shape="circle" icon="search" />
          <Button type="primary" shape="circle" icon="search" />
          <Button type="primary" shape="circle" icon="search" />
        </span>
      )
    }
  ]

  fetchBlogs() {
    Http.get('api/v1/blogs').then(res => {
      console.log(res)
      this.setState({
        blogs: res.data.blogs
      })
    })
  }

  componentDidMount() {
    this.fetchBlogs()
  }

  render() {
    return (
      <div>
              <Link to='/blog/add'>xxx</Link>
        <Button type="primary" >添加</Button>
        <Table
          columns={this.columns()}
          dataSource={this.state.blogs}
          rowKey={record => record.id}
        />
      </div>
    )
  }
}

export default Blog
