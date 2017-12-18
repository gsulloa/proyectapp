import React, { Component } from "react"
import { connect } from "react-redux"

import { Body, FormContainer } from "../components/container"
import { Title } from "../components/text"
import { iconField, Button } from "../components/form"

import t from "tcomb-form-native"
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

class LoginForm extends Component {
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
    console.log(this.state)
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
