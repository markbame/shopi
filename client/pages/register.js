import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, Avatar, Icon, Row } from 'antd'
import Navigation from '../components/navigation'
import RegistrationForm from '../components/registrationForm'
import { register } from '../state/actions/users'

class Register extends Component {

  static fetchData(store) {

  }

  componentWillMount = () => {

  }

   render() {
    return (
      <Card bordered={false}  style={{width:"800px"}}>
        <Navigation name={'Register'} />
        <RegistrationForm register={this.props.register} />
      </Card>
    )
  }
}

function mapStateToProps(state, props) {
  const {users} = state
  return {users}
}

function mapDispatchToProps(dispatch) {
  return {
    register: bindActionCreators(register, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
