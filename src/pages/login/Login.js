import React from 'react'
import { Input, Button, Row, Col } from 'antd'

import Http from '../../utils/Http'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'admin',
      password: 'admin123'
    }
  }

  login() {
    Http.post('auth', { username: this.state.username, password: this.state.password }).then(res => {
      console.log(res)
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <div>
        <Row justify="center" align="middle">
          <Col span={12} offset={6}>
            <Input
              placeholder="用户名"
              onChange={e =>
                this.setState({
                  username: e.target.value
                })
              }
            />
            <Input
              placeholder="密码"
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
            />
            <Button
              type="primary"
              onClick={e => {
                this.login()
              }}
            >
              登陆
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Login
