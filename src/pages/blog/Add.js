import React from 'react'
import { Input, Select, Button, Form, Upload, Icon,message } from 'antd'

import Http from '../../utils/Http'

const Option = Select.Option
const { TextArea } = Input

class Add extends React.Component {


  state = {
    categories: [],
    tags: [],
    fileList:[],
    uploading:false,
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
      category_id:getFieldValue("category_id"),
      title:getFieldValue("title"),
      content:getFieldValue("content"),
      tag_ids:getFieldValue("tag_ids"),
    }

    if (getFieldValue("upload")){
      // data.append("summary_img",getFieldValue("upload"))
      data["summary_img"] = getFieldValue("upload").file
    }

    this.setState({
      uploading: true,
    });

    Http.post('api/v1/blog/add', data).then(res => {
      message.success('添加博客成功')
      this.props.form.resetFields(); 
      this.setState({
        fileList: [],
        uploading: false,
      })
    }).catch(err=>{
      this.setState({
        uploading: false,
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
    const { uploading } = this.state;
    const props = {
      action: '',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file)
          const newFileList = fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    }



    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入标题'
                }
              ],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            label="图片"
            extra="如果没有上传，则从图库中随机取出一张"
          >
            {getFieldDecorator('upload', {
              
            })(
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>
            )}
          </Form.Item>

          <Form.Item label="类别">
            {getFieldDecorator('category_id', {
              rules: [
                {
                  required: true,
                  message: '请选择你的类别'
                }
              ]
            })(
              <Select>
                {this.state.categories.map(item => this.renderOption(item))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="标签">
            {getFieldDecorator('tag_ids', {
              rules: [
                {
                  required: false,
                  message: '请选择标签'
                }
              ]
            })(
              <Select
                mode="multiple"
              >
                {this.state.tags.map(item => this.renderOption(item))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="内容">
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: '请输入内容'
                }
              ]
            })(
              <TextArea
                autosize={{ minRows: 8, maxRows: 30 }}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" loading={uploading} onClick={this.handleSubmit}>
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
