import React from 'react'
import { Table, Button, message, Modal, Form, Input } from 'antd'
import './style.css'

import Http from '../../utils/Http'

class Category extends React.Component {
  state = {
    categories: [],
    loading: false,
    title: '',
    visible: false,
    confirmLoading: false,
    action: 0,
    checkRow:{}
  }

  columns = _ => [
    {
      title: '标题',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'created'
    },
     {
      title: '修改时间',
      dataIndex: 'modified'
    },
    {
      title: '操作',
      dataIndex: '',
      render: id => (
        <span>
          <Button
            className="action"
            type="primary"
            shape="circle"
            icon="delete"
            onClick={() => this.handleDelete(id)}
          />
          <Button
            className="action"
            type="primary"
            shape="circle"
            icon="edit"
            onClick={() => this.handleUpdate(id)}
          />
        </span>
      )
    }
  ]

  fetchCategorys() {
    this.setState({ loading: true })
    Http.get('api/v1/category/list', {
      page_num: 0,
      page_size: 10
    }).then(res => {
      this.setState({
        categories: res.data.categories,
        loading: false
      })
    })
  }

  componentDidMount() {
    this.fetchCategorys()
  }

  handleDelete = row => {

    Modal.confirm({
      title: '删除',
      content: `是否需要删除${row.name}？`,
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        Http.post('api/v1/category/delete', { id: row.id }).then(res => {
          message.success('删除成功')
          this.fetchCategorys()
        })
      }
    });
  }

  handleAdd = () => {
    this.setState({ visible: true, title: '添加类别', action: 0,checkRow:{} })
  }

  handleUpdate = row => {
    this.setState({ visible: true, title: '添加类别', action: 1,checkRow:row })
  }

  handleOk = () => {
    const { getFieldValue } = this.props.form
    const {action,checkRow} = this.state
    const data = {
      name: getFieldValue('category')
    }
    let url = ''
    if(action ===0){    
     url ='api/v1/category/add'
    }else{
      url = 'api/v1/category/update'
      data['id'] = checkRow.id
    }

    this.setState({confirmLoading:true})
    Http.post(url, data)
    .then(res => {
      message.success('操作类别成功')
      this.setState({ visible: false,confirmLoading:false })
      this.props.form.resetFields()
      this.fetchCategorys()
    })
    .catch(err => {})
   
  }

  render() {
    const { visible, confirmLoading, categories, title,checkRow } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Button
          className="bt-add"
          type="primary"
          shape="circle"
          icon="plus"
          onClick={() => this.handleAdd()}
        />

        <Table
          pagination={false}
          columns={this.columns()}
          dataSource={categories}
          rowKey={record => record.id}
        />

        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => this.setState({ visible: false })}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="类别">
              {getFieldDecorator('category', {
                rules: [
                  {
                    required: true,
                    message: '请输入类别',
                  }
                ],
                initialValue:checkRow.name
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const CategoryForm = Form.create()(Category)

export default CategoryForm
