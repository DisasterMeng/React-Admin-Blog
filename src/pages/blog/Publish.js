import React from 'react'
import {
  Input,
  Select,
  Button,
  Form,
  Upload,
  Icon,
  message,
  Row,
  Col
} from 'antd'

import Http from '../../utils/Http'
import Markdown from './Markdown'
import './style.css'

const Option = Select.Option
const { TextArea } = Input
class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      tags: [],

      fileList: [],
      uploading: false
    }
  }

  fetchCategorys() {
    Http.get('api/v1/category/list').then(res => {
      console.log(res.data.categories)
      this.setState({
        categories: res.data.categories
      })
    })
  }

  fetchTags() {
    Http.get('api/v1/tag/list').then(res => {
      console.log(res.data.tags)
      this.setState({
        tags: res.data.tags
      })
    })
  }

  handleSubmit = () => {
    const { getFieldValue } = this.props.form

    const data = {
      category_id: getFieldValue('category_id'),
      title: getFieldValue('title'),
      content: getFieldValue('content'),
      tag_ids: getFieldValue('tag_ids')
    }

    if (getFieldValue('upload')) {
      // data.append("summary_img",getFieldValue("upload"))
      data['summary_img'] = getFieldValue('upload').file
    }

    console.log(data)

    this.setState({
      uploading: true
    })

    Http.post('api/v1/blog/add', data)
      .then(res => {
        message.success('添加博客成功')
        this.props.form.resetFields()
        this.setState({
          fileList: [],
          uploading: false
        })
      })
      .catch(err => {
        this.setState({
          uploading: false
        })
      })
  }

  componentDidMount() {
    this.fetchCategorys()
    this.fetchTags()
  }

  renderOption = item => (
    <Option value={item.id} key={item.name}>
      {item.name}
    </Option>
  )

  render() {
    const { getFieldDecorator } = this.props.form
    const { uploading } = this.state
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file)
          const newFileList = fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList
          }
        })
      },
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file]
        }))
        return false
      },
      fileList: this.state.fileList
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Form.Item label="">
              {getFieldDecorator('upload', {})(
                <Upload className="upload" {...props}>
                  <img className="upload-img" />
                  <Button
                    className="upload-bt"
                    type="primary"
                    shape="circle"
                    icon="upload"
                  />
                </Upload>
              )}
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题'
                  }
                ]
              })(<Input className="title-input" size="large" placeholder="请输入标题" />)}
            </Form.Item>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label="">
                {getFieldDecorator('category_id', {
                  rules: [
                    {
                      required: true,
                      message: '请选择你的类别'
                    }
                  ]
                })(
                  <Select placeholder="请选择类别">
                    {this.state.categories.map(item => this.renderOption(item))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="">
                {getFieldDecorator('tag_ids', {
                  rules: [
                    {
                      required: false,
                      message: '请选择标签'
                    }
                  ]
                })(
                  <Select mode="multiple" placeholder="请选择标签">
                    {this.state.tags.map(item => this.renderOption(item))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>


          <Markdown></Markdown>

          <Form.Item label="内容">
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: '请输入内容'
                }
              ]
            })(<TextArea autosize={{ minRows: 8, maxRows: 30 }} />)}
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={this.handleSubmit}>
              发布
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const AddForm = Form.create()(Add)

export default AddForm
