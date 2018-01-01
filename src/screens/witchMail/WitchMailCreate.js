import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import t from "tcomb-form-native"

import { Body } from "../../components/container"
import { WITCH_MAIL_COLOR } from "../../components/colors"
import { Button } from "../../components/form"
import { newWitchMail } from "../../redux/modules/witchMail"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import textField from "../../components/form/textField"
import selectField from "../../components/form/selectField"

const Form = t.form.Form
const WitchMailFormStructGenerator = communities =>
  t.struct({
    community: t.enums(communities, "Community"),
    content: t.String,
  })

const options = {
  fields: {
    community: {
      template: selectField,
      config: {
        color: {
          container: WITCH_MAIL_COLOR.input.background,
          text: WITCH_MAIL_COLOR.input.color,
        },
      },
    },
    content: {
      multiline: true,
      returnKeyType: "next",
      template: textField,
      config: {
        color: {
          container: WITCH_MAIL_COLOR.input.background,
          text: WITCH_MAIL_COLOR.input.color,
        },
      },
    },
  },
}

const mapStateToProps = state => {
  return {
    communities: state.community.data,
    fetching: state.community.fetching,
  }
}
const mapDispatchToProps = dispatch => ({
  newWitchMail: data => dispatch(newWitchMail(data)),
})

const initialValues = {
  community: "",
  content: "",
}

class WitchMailCreate extends Component {
  static propTypes = {
    communities: PropTypes.array.isRequired,
    newWitchMail: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
  }
  static defaultProps = {
    communities: [],
  }
  state = {
    value: initialValues,
  }
  onChange = value => {
    this.setState({ value })
  }
  handleSubmit = () => {
    this.props.newWitchMail(this.state.value)
    this.setState({ value: initialValues })
  }
  getStruct = () => {
    const communities = {}
    this.props.communities.forEach(community => {
      communities[community.id] = community.name
    })
    return WitchMailFormStructGenerator(communities)
  }
  render = () => {
    return (
      <Body backgroundColor={WITCH_MAIL_COLOR.background}>
        <KeyboardAwareScrollView>
          <Form
            options={options}
            type={this.getStruct()}
            value={this.state.value}
            onChange={this.onChange}
          />
          <Button
            title="ENVIAR"
            onPress={this.handleSubmit}
            color={WITCH_MAIL_COLOR.input.color}
            backgroundColor={WITCH_MAIL_COLOR.input.background}
            disabled={this.props.fetching}
          />
        </KeyboardAwareScrollView>
      </Body>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WitchMailCreate)
