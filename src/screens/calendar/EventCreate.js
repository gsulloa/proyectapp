import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import t from "tcomb-form-native"

import { Body } from "../../components/container"
import { CALENDAR_COLOR } from "../../components/colors"
import { Button } from "../../components/form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { devlog } from "../../utils/log"

import { newEvent } from "../../redux/modules/event"

const Form = t.form.Form
const EventFormStruct = t.struct({
  name: t.String,
  description: t.String,
  start: t.Date,
})

const options = {
  fields: {},
}

const mapDispatchToProps = dispatch => ({
  newEvent: data => dispatch(newEvent(data)),
})

const initialValues = {
  name: "",
  description: "",
  start: new Date(),
}

class EventCreate extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    newEvent: PropTypes.func.isRequired,
  }
  static defaultProps = {
    sections: [],
  }
  state = {
    value: initialValues,
  }
  onChange = value => {
    this.setState({ value })
  }
  handleSubmit = () => {
    this.setState({
      value: initialValues,
    })
    this.props.newEvent(this.state.value)
  }
  render = () => {
    devlog("EventCreate", this.props)
    return (
      <Body backgroundColor={CALENDAR_COLOR.background}>
        <KeyboardAwareScrollView>
          <Form
            options={options}
            type={EventFormStruct}
            value={this.state.value}
            onChange={this.onChange}
          />
          <Button
            title="ENVIAR"
            onPress={this.handleSubmit}
            color={CALENDAR_COLOR.container}
          />
        </KeyboardAwareScrollView>
      </Body>
    )
  }
}

export default connect(null, mapDispatchToProps)(EventCreate)
