import React from 'react'
import { Table, Button, message, Modal, Form, Input, Upload, Icon } from 'antd'
import moment from 'moment'

import './style.css'
import Http from '../../utils/Http'


class Manage extends React.Component {
  state = {
    friends: [],
    loading: false,
    fileList: [],
    title: '',
    visible: false,
    confirmLoading: false,
    action: 0,
    checkRow: {}
  }

  componentDidMount() {
    this.fetchFriends()
  }

  fetchFriends() {
    this.setState({ loading: true })
    Http.get('api/v1/friend/list', {
      page_num: 0,
      page_size: 10
    }).then(res => {
      this.setState({
        friends: res.data.friends,
        loading: false
      })
    })
  }


  handleDelete = row => {

    Modal.confirm({
      title: '删除',
      content: `是否需要删除${row.name}？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        Http.post('api/v1/friend/delete', { id: row.id }).then(res => {
          message.success('删除成功')
          this.fetchFriends()
        })
      }
    });
  }

  handleAdd = () => {
    this.setState({ visible: true, title: '添加友链', action: 0, checkRow: {} })
  }

  handleUpdate = row => {
    this.setState({ visible: true, title: '修改友链', action: 1, checkRow: row })
  }

  handleOk = () => {
    const { getFieldValue } = this.props.form
    const { action, checkRow } = this.state
   
    const data = {
      name:getFieldValue("name"),
      link:getFieldValue("link"),
      desc:getFieldValue("desc"),
    }

    if (getFieldValue("upload")){
      data["image"] = getFieldValue("upload").file
    }


    let url = ''
    if (action === 0) {
      url = 'api/v1/friend/add'
    } else {
      url = 'api/v1/friend/update'
      data['id'] = checkRow.id
    }

    this.setState({ confirmLoading: true })
    Http.post(url, data)
      .then(res => {
        message.success('操作类别成功')
        this.setState({ visible: false, confirmLoading: false })
        this.props.form.resetFields()
        this.fetchFriends()
      })
      .catch(err => { })

  }

  render() {
    const { visible, confirmLoading, friends, title, checkRow } = this.state
    const { getFieldDecorator } = this.props.form

    const uploadProps = {
      action: '',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file)
          const newFileList = fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList,
          }
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    }

    const columns = _ => [
      {
        title: '标题',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'created',
        render: created => (<span>{moment(created).format('YYYY-MM-DD hh:mm')}</span>)
      },
      {
        title: '修改时间',
        dataIndex: 'modified',
        render: modified => (<span>{moment(modified).format('YYYY-MM-DD hh:mm')}</span>)
      },
      {
        title: '操作',
        dataIndex: '',
        render: row => (
          <span>
            <Button
              className="action"
              type="primary"
              shape="circle"
              icon="delete"
              onClick={() => this.handleDelete(row)}
            />
            <Button
              className="action"
              type="primary"
              shape="circle"
              icon="edit"
              onClick={() => this.handleUpdate(row)}
            />
          </span>
        )
      }
    ]

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
          columns={columns()}
          dataSource={friends}
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
            <Form.Item label="昵称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入昵称',
                  }
                ],
                initialValue: checkRow.name
              })(<Input />)}
            </Form.Item>

            <Form.Item label="链接">
              {getFieldDecorator('link', {
                rules: [
                  {
                    required: true,
                    message: '请输入链接'
                  }
                ],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="描述">
              {getFieldDecorator('desc', {
                rules: [
                  {
                    message: '请输入描述'
                  }
                ],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item
              label="图片"
            >
              {getFieldDecorator('upload', {

              })(
                <Upload {...uploadProps}>
                  <Button>
                    <Icon type="upload" /> 点击上传
                </Button>
                </Upload>
              )}
            </Form.Item>

          </Form>
        </Modal>
      </div>
    )
  }
}


export default Form.create()(Manage)
