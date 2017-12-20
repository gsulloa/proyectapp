import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import t from "tcomb-form-native"

import { Body } from "../../components/container"
import { REPORTS_COLOR } from "../../components/colors"
import { Button } from "../../components/form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { devlog } from "../../utils/log"
import { getSections } from "../../redux/modules/section"
import { newReport } from "../../redux/modules/report";

const Form = t.form.Form
const ReportsFormStructGenerator = sections =>
  t.struct({
    section: t.enums(sections, "Section"),
    content: t.String,
  })

const options = {
  fields: {},
}

const mapStateToProps = (state, ownProps) => {
  devlog("ownProps", ownProps)
  return {
    sections: state.section.data[ownProps.manualId],
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  getSections: () => dispatch(getSections(ownProps.manualId)),
  newReport: data =>
    dispatch(newReport(data.manual, data.section, data.content)),
})

const initialValues = {
  section: "",
  content: "",
}

class WitchMailCreate extends Component {
  static propTypes = {
    manualId: PropTypes.number.isRequired,
    sections: PropTypes.array.isRequired,
    getSections: PropTypes.func.isRequired,
    newReport: PropTypes.func.isRequired,
  }
  static defaultProps = {
    sections: [],
  }
  state = {
    value: initialValues,
  }
  componentWillMount = () => {
    this.props.getSections()
  }
  onChange = value => {
    this.setState({ value })
  }
  handleSubmit = () => {
    this.props.newReport({ ...this.state.value, manual: this.props.manualId })
    this.setState({
      value: initialValues,
    })
  }
  getStruct = () => {
    const sections = {}
    this.props.sections.forEach(section => {
      sections[section.id] = section.name
    })
    return ReportsFormStructGenerator(sections)
  }
  render = () => {
    devlog("ReportsCreate", this.props)
    return (
      <Body backgroundColor={REPORTS_COLOR.background}>
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
            color={REPORTS_COLOR.color}
          />
        </KeyboardAwareScrollView>
      </Body>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WitchMailCreate)
