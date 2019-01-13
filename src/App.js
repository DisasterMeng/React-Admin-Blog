import React, { Component } from 'react'

import { Switch, Route,withRouter } from 'react-router-dom'

import Login from './pages/login/Login'
import NoFound from './pages/nofound/NoFound'
import Front from './pages/front/Front'
import Http from './utils/Http'

import './styles/App.css'

class App extends Component {
  userInfo() {

    Http.get('api/v1/user/info').then(res => {
      console.log(res.data)
    })
    .catch(err=>{
      this.props.history.push('/login')
    })
  }

  componentDidMount() {
    this.userInfo()
  }

  render() {
    return (
      <Route>
        <div className='app-container'>
          <Switch>
            <Route path="/login" component={Login} />>
            <Route path="404" component={NoFound} />
            <Route component={Front} />
          </Switch>
        </div>
      </Route>
    )
  }
}

export default withRouter(App)
