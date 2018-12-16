import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, Avatar, Icon, Row } from 'antd'
import Navigation from '../components/navigation'

class Home extends Component {

  static fetchData(store) {

  }

   render() {
    return (
      <Card bordered={false}  style={{width:"800px"}}>
        <Navigation name={'Home'} />
        <h3>Home</h3>
      </Card>
    )
  }
}

function mapStateToProps(state, props) {
  const {users} = state
  return {users}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
