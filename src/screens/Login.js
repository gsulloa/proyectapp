import React, { Component } from "react"
import PropType from "prop-types"
import { connect } from "react-redux"
import t from "tcomb-form-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { LOGIN_COLOR } from "../components/colors"
import { Body, FormContainer } from "../components/container"
import { Title } from "../components/text"
import { Button } from "../components/form"
import textField from "../components/form/textField"

import { loginUser } from "../redux/modules/authentication"

const LoginFormStruct = t.struct({
  email: t.String,
  password: t.String,
})
const options = {
  fields: {
    password: {
      secureTextEntry: true,
      template: textField,
      config: {
        iconProps: { name: "ios-lock", type: "ionicon" },
        color: {
          container: LOGIN_COLOR.input.background,
          text: LOGIN_COLOR.input.color,
        },
      },
    },
    email: {
      autoCapitalize: "none",
      template: textField,
      keyboardType: "email-address",
      config: {
        iconProps: { name: "ios-person", type: "ionicon" },
        color: {
          container: LOGIN_COLOR.input.background,
          text: LOGIN_COLOR.input.color,
        },
      },
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
      <KeyboardAwareScrollView>
        <FormContainer>
          <Form
            type={LoginFormStruct}
            options={options}
            value={this.state.value}
            onChange={this.onChange}
          />
          <Button
            title="ENTRAR"
            onPress={this.handleSubmit}
            color={LOGIN_COLOR.input.color}
            backgroundColor={LOGIN_COLOR.input.background}
          />
        </FormContainer>
      </KeyboardAwareScrollView>
    )
  }
}

const LoginForm = connect(null, mapDispatchToProps)(LoginFormPresentational)

class Login extends Component {
  render = () => {
    return (
      <Body backgroundColor={LOGIN_COLOR.background}>
        <Title color={LOGIN_COLOR.color}>PROYECTAPP</Title>
        <LoginForm />
      </Body>
    )
  }
}

export default Login
