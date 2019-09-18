/*
老板信息完善的路由容器组件
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import { updateUser } from '../../redux/actions'

class LaobanInfo extends Component {

  state = {
    avatar: '', //头像
    info: '', //职位简介
    post: '', //职位名称
    company: '', // 公司名称
    salary: '' //工资
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  // 更新header状态
  setHeader = avatar => {
    this.setState({ avatar })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render() {
    // 如果信息已经完善, 自动重定向到对应主界面
    const { avatar, type } = this.props.user
    if (avatar) { // 说明信息已经完善
      const path = type === 1 ? '/dashen' : '/laoban'
      return <Redirect to={path} />
    }

    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem placeholder='请输入招聘职位' onChange={val => { this.handleChange('post', val) }}>招聘职位:</InputItem>
        <InputItem placeholder='请输入公司名称' onChange={val => { this.handleChange('company', val) }}>公司名称:</InputItem>
        <InputItem placeholder='请输入职位薪资' onChange={val => { this.handleChange('salary', val) }}>职位薪资:</InputItem>
        <TextareaItem title="职位要求:"
          placeholder='请输入个人介绍'
          rows={3} onChange={val => { this.handleChange('info', val) }} />
        <Button type='primary' onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(LaobanInfo)