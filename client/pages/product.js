import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card } from 'antd'
import Navigation from '../components/navigation'
import ProductForm from '../components/productForm'
import { update, list, get } from '../state/actions/crud'
import Cookies from 'universal-cookie'

const PAGE_NAME = 'Product'
class Product extends Component {
  state =  { }
  static fetchData (fd) {
    const {store, match, adminAuth, adminDB, authUser, idToken, eventEmitter } = fd
    adminAuth.verifyIdToken(idToken).then(decodedToken => {
        get(`products/${decodedToken.uid}/${match.params.id}`, 'FETCHED_PRODUCT', authUser.uid, true)
        ( store.dispatch, adminDB, eventEmitter )
    })
  }

  componentDidMount = () => {
    const {userID} = this.props.state.users
    this.props.get(`products/${userID}/${this.props.match.params.id}`, 'FETCHED_PRODUCT')
  }

   render() {
    return (
      <Card bordered={false}  style={{width:"800px"}}>
        <Navigation name={PAGE_NAME} />
        <ProductForm
          product={this.props.state.products.product}
          update={this.props.update}
          userID={this.props.state.userID}
          id={this.props.match.params.id}
        />
      </Card>
    )
  }
}

function mapStateToProps(state, props) {
  return { state }
}

function mapDispatchToProps(dispatch) {
  return {
    update: bindActionCreators(update, dispatch),
    get: bindActionCreators(get, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
