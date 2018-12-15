import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { logout } from '../state/actions/users'

const {SubMenu, ItemGroup} = Menu
class Navigation extends Component {
  state = {
    userLogedIn:  'online'
  }
  componentWillMount = () => {
    this.setState({
      userLogedIn: this.props.users.status || this.state.userLogedIn
    })
  }
  componentWillReceiveProps (newProps) {
    if(newProps.users.status) {
      this.setState({
        userLogedIn: newProps.users.status
      })
    }
  }
  render () {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <Menu
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="/home"><Icon type="home" /></Link>
          </Menu.Item>
          { this.state.userLogedIn == 'online'&&
            <Menu.Item key="followers">
              <Link to="/followers"><Icon type="team" /></Link>
            </Menu.Item>
          }
          { this.state.userLogedIn == 'online'&&
            <Menu.Item key="products">
              <Link to="/products"><Icon type="shop" /></Link>
            </Menu.Item>
          }
          { this.state.userLogedIn == 'offline' &&
            <Menu.Item key="login"  style={{float:'right'}}>
                <Link to="/login"><Icon type="login" /></Link>
            </Menu.Item>
          }
          { this.state.userLogedIn == 'offline' &&
            <Menu.Item key="register"  style={{float:'right'}}>
              <Link to="/register">Register</Link>
            </Menu.Item>
          }
          { this.state.userLogedIn == 'online'&&
            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="menu-unfold" /></span>} style={{float:'right'}}>
                <Menu.Item key="settings" >
                    <Link to="/setting"><Icon type="setting" />Settings</Link>
                </Menu.Item>
                <Menu.Item key="logout" >
                    <Link to="/#" onClick={()=>{this.props.logout()}}><Icon type="logout" />Logout</Link>
                </Menu.Item>
            </SubMenu>
          }
          { this.state.userLogedIn == 'online' &&
            <Menu.Item key="profile"  style={{float:'right'}}>
              <Link to="/profile"><Icon type="user" /></Link>
            </Menu.Item>
          }
        </Menu>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const {users} = state
  return {users}
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
