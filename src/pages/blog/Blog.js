import React from 'react'
import { Table, Tag, Button,message } from 'antd'
import './style.css'

import Http from '../../utils/Http'


class Blog extends React.Component {
  state = {
    blogs: [],
    loading:false
  }


  deleteHandler = (id)=>{
    console.log(id)
    Http.post('api/v1/blog/delete',{id:id}).then(res=>{
      message.success("删除成功")
      this.fetchBlogs()
    })
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
      dataIndex: 'id',
      render: id => (
        <span>
          <Button className="action" type="primary" shape="circle" icon="delete" onClick={()=>this.deleteHandler(id)} />
          <Button className="action" type="primary" shape="circle" icon="edit" />
        </span>
      )
    }
  ]

  fetchBlogs() {
    this.setState({loading:true})
    Http.get('api/v1/blog/list',{
      page_num:0,
      page_size:10
    }).then(res => {
      this.setState({
        blogs: res.data.blogs,
        loading:false
      })
    })
  }

  componentDidMount() {
    this.fetchBlogs()
  }

  render() {
    return (
      <div>            
        <Table
          loading={this.state.loading}
          columns={this.columns()}
          dataSource={this.state.blogs}
          rowKey={record => record.id}
        />
      </div>
    )
  }
}

export default Blog
