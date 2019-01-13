import React from 'react'

import { Input, Select } from 'antd'

import Http from '../../../utils/Http'
const Option = Select.Option
const { TextArea } = Input
class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      tags: []
    }
  }

  fetchCategorys() {
    Http.get('api/v1/categorys').then(res => {
      console.log(res.data.categories)
      this.setState({
        categories: res.data.categories
      })
    })
  }

  fetchTags() {
    Http.get('api/v1/tags').then(res => {
      console.log(res.data.tags)
      this.setState({
        tags: res.data.tags
      })
    })
  }

  componentDidMount() {
    this.fetchCategorys()
    this.fetchTags()
  }

  renderOption = item => (
    <Option value="Yiminghe" key={item.id}>
      {item.name}
    </Option>
  )

  render() {
    return (
      <div>
        <Input placeholder="标题" />
        <Select
          style={{ width: 120 }}
          // onChange={}
        >
          {this.state.categories.map(item => this.renderOption(item))}
        </Select>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          // onChange={handleChange}
        >
          {this.state.tags.map(item => this.renderOption(item))}
        </Select>
        ,
        <TextArea placeholder="内容" autosize={{ minRows: 2, maxRows: 6 }} />
      </div>
    )
  }
}

export default Add
