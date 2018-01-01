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
import textField from "../../components/form/textField"
import datepickerField from "../../components/form/datepickerField"

const Form = t.form.Form
const EventFormStruct = t.struct({
  name: t.String,
  description: t.String,
  start: t.Date,
})

const options = {
  fields: {
    name: {
      returnKeyType: "next",
      template: textField,
      config: {
        color: {
          container: CALENDAR_COLOR.input.background,
          text: CALENDAR_COLOR.input.color,
        },
      },
    },
    description: {
      returnKeyType: "next",
      multiline: true,
      template: textField,
      numberOfLines: 7,
      config: {
        color: {
          container: CALENDAR_COLOR.input.background,
          text: CALENDAR_COLOR.input.color,
        },
      },
    },
    start: {
      mode: "datetime",
      template: datepickerField,
      config: {
        color: {
          container: CALENDAR_COLOR.input.background,
          text: CALENDAR_COLOR.input.color,
        },
      },
    },
  },
}
const mapStateToProps = state => ({
  fetching: state.event.fetching,
})

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
    fetching: PropTypes.bool,
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
    this.props.newEvent(this.state.value)
    this.setState({
      value: initialValues,
    })
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
            color={CALENDAR_COLOR.input.color}
            backgroundColor={CALENDAR_COLOR.input.background}
            disabled={this.props.fetching}
          />
        </KeyboardAwareScrollView>
      </Body>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate)
