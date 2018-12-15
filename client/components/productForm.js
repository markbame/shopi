import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Form, Select, Input, Button, Tag, DatePicker, Icon, Checkbox, InputNumber } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class productForm extends Component {

  state = {
    product:{}
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.props.create) {
          this.props.create(values, `products/${this.props.userID}`, "UPSERTED_PRODUCT")
          this.props.handleClose()
        } else {
          this.props.update(values, `products/${this.props.userID}/${this.props.id}`, "UPSERTED_PRODUCT")
          this.setState({ redirect: true })
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{padding:"2px"}}>
      <Tag color="magenta" style={{margin:"20px"}}><Icon type="shopping" /> Update Product</Tag>
      { this.state.redirect && <Redirect to={`/products`} /> }
      <FormItem
          label="Title"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please add the title!' }],
            initialValue:   this.props.product && this.props.product.title || ''
          })(
            <Input />
          )}
      </FormItem>
      <FormItem
          label="Price"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('price', {
            rules: [{ required: true, message: 'Please add the price!' }],
            initialValue: this.props.product &&  this.props.product.price || 1
          })(
            <InputNumber />
          )}
      </FormItem>
      <FormItem
            label="Unit"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('unit', {
              rules: [{ required: true, message: 'Please add the unit!' }],
              initialValue: this.props.product &&  this.props.product.unit || 'pcs'
            })(
              <Input />
            )}
        </FormItem>
        <FormItem label="Taxable"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}>
          {getFieldDecorator('taxable', {
            valuePropName: 'checked',
            initialValue: this.props.product &&  this.props.product.taxable?true:false
          })(
            <Checkbox/>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 5 }} >
          <Button type="primary" htmlType="submit" loading={this.props.loading}  style={{margin:"2px"}}>
            Save
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(productForm)
