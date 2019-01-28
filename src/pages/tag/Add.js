import React from 'react'

import { Input, Select, Button, Form, Upload, Icon,message } from 'antd'

import Http from '../../utils/Http'


class Add extends React.Component {



  handleSubmit = () => {

    const { getFieldValue } = this.props.form

    const data = {
      name:getFieldValue("tag"),
    }

   
    Http.post('api/v1/tag/add', data).then(res => {
      message.success('添加标签成功')
      this.props.form.resetFields(); 
    }).catch(err=>{
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form
  
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="标签">
            {getFieldDecorator('tag', {
              rules: [
                {
                  required: true,
                  message: '请输入标签'
                }
              ],
            })(
              <Input />
            )}
          </Form.Item>

      
          <Form.Item>
            <Button type="primary" onClick={this.handleSubmit}>
              添加
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const AddForm = Form.create()(Add)


export default AddForm
