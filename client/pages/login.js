import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  { Redirect } from 'react-router-dom'
import { Card } from 'antd'
import Navigation from '../components/navigation'
import LoginForm from '../components/loginForm'
import { login, SSR_LOAD_COMPLETE } from '../state/actions/users'
const LOGIN_REDIRECT = 'products'
class Login extends Component {
	static fetchData (fd) {
		setTimeout(()=>fd.eventEmitter.emit(SSR_LOAD_COMPLETE))
	}
	render() {
		return (
			<Card bordered={false}  style={{width:'800px'}}>
				{ this.props.users.redirect && <Redirect to={`/${LOGIN_REDIRECT}`} /> }
				<Navigation name={'Login'} />
				<LoginForm login={this.props.login} loading={this.props.users.loading} />
			</Card>
		)
	}
}

function mapStateToProps(state, props) {
	return {users: state.users}
}

function mapDispatchToProps(dispatch) {
	return {
		login: bindActionCreators(login, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
