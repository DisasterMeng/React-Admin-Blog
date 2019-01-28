import React from 'react'
import { Table, Tag, Button,message } from 'antd'
import './style.css'

import Http from '../../utils/Http'


class Category extends React.Component {
  state = {
    tags: []
  }


  deleteHandler = (id)=>{
    console.log(id)
    
    Http.post('api/v1/tag/delete',{id:id}).then(res=>{
      message.success("删除成功")
      this.fetchTags()
    })
  }


  columns = _ => [
    {
      title: '标题',
      dataIndex: 'name'
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

  fetchTags() {
    
    Http.get('api/v1/tag/list',{
      page_num:0,
      page_size:10
    }).then(res => {
   
      this.setState({
        tags: res.data.tags
      })
    })
  }

  componentDidMount() {
    this.fetchTags()
  }

  render() {
    return (
      <div>            
        <Table
          columns={this.columns()}
          dataSource={this.state.tags}
          rowKey={record => record.id}
        />
      </div>
    )
  }
}

export default Category
