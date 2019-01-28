import React from 'react'

import { Input, Button, Form, message } from 'antd'

import Http from '../../utils/Http'


class Add extends React.Component {



  handleSubmit = () => {

    const { getFieldValue } = this.props.form

    const data = {
      name:getFieldValue("category"),
    }

   
    Http.post('api/v1/category/add', data).then(res => {
      message.success('添加类别成功')
      this.props.form.resetFields(); 
    }).catch(err=>{
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form
  
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="类别">
            {getFieldDecorator('category', {
              rules: [
                {
                  required: true,
                  message: '请输入类别'
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
