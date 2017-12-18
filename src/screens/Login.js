import React, { Component } from "react"
import PropType from "prop-types"
import { connect } from "react-redux"
import t from "tcomb-form-native"

import { Body, FormContainer } from "../components/container"
import { Title } from "../components/text"
import { iconField, Button } from "../components/form"

import { loginUser } from "../redux/modules/authentication"

const LoginFormStruct = t.struct({
  email: t.String,
  password: t.String,
})
const options = {
  fields: {
    password: {
      secureTextEntry: true,
      template: iconField,
      config: { iconProps: { name: "ios-lock", type: "ionicon" } },
    },
    email: {
      template: iconField,
      config: { iconProps: { name: "ios-person", type: "ionicon" } },
    },
  },
}
const Form = t.form.Form

const mapDispatchToProps = dispatch => ({
  login: creds => dispatch(loginUser(creds)),
})

class LoginFormPresentational extends Component {
  static propTypes = {
    login: PropType.func.isRequired,
  }
  state = {
    value: {
      email: "",
      password: "",
    },
  }
  onChange = value => {
    this.setState({ value })
  }
  handleSubmit = () => {
    this.props.login(this.state.value)
  }
  render = () => {
    return (
      <FormContainer>
        <Form
          type={LoginFormStruct}
          options={options}
          value={this.state.value}
          onChange={this.onChange}
        />
        <Button title="ENTRAR" onPress={this.handleSubmit} color="#00678A" />
      </FormContainer>
    )
  }
}

const LoginForm = connect(null, mapDispatchToProps)(LoginFormPresentational)

class Login extends Component {
  render = () => {
    return (
      <Body backgroundColor="#76C0E3">
        <Title color="white">PROYECTA</Title>
        <LoginForm />
      </Body>
    )
  }
}

export default Login
