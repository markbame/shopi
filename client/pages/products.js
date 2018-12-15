import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, Table } from 'antd'
import Navigation from '../components/navigation'
import ProductModal from '../components/productModal'
import {rowSelection, columns} from '../components/productsTable'
import { list, create } from '../state/actions/crud'


class Products extends Component {
  state = {
    userID:{}
  }

  static fetchData(store) {
    //return store.dispatch(list(`products/${this.props.state.users.userID || this.state.userID}`, 'FETCHED_PRODUCTS'))
  }

  componentDidMount = () => {  
    this.props.list(`products/${'AdnSCC8yOwebNVUbCNQjAumxNVd2'}`, 'FETCHED_PRODUCTS')
  }

  componentWillReceiveProps (newProps) {
      if(newProps.state.products) {
        this.setState({
          products: newProps.state.products.products
        })
      }
      if(newProps.state.users.userID) {
        this.setState({
          userID: newProps.state.users.userID
        })
      }
  }
   render() {
     const data = this.state.products || []
    return (
      <Card bordered={false}  style={{width:"800px"}}>
        <Navigation name={'Products'} />
        <ProductModal
          create={this.props.create}
          product={this.state.product}
          userID={this.props.state.users.userID || this.state.userID}
        />
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small" />
      </Card>
    )
  }
}

function mapStateToProps(state, props) {
  return { state }
}

function mapDispatchToProps(dispatch) {
  return {
    create: bindActionCreators(create, dispatch),
    list: bindActionCreators(list, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
