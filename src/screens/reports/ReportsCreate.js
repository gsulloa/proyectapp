import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import t from "tcomb-form-native"

import { Body, NoFlexRow as Row } from "../../components/container"
import { REPORTS_COLOR } from "../../components/colors"
import { Button } from "../../components/form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { devlog } from "../../utils/log"
import { getSections } from "../../redux/modules/section"
import { newReport } from "../../redux/modules/report"
import textField from "../../components/form/textField"
import selectField from "../../components/form/selectField"
import { SubTitle } from "../../components/text"
import { Icon } from "../../components/icons"

const Form = t.form.Form
const ReportsFormStructGenerator = sections =>
  t.struct({
    section: t.enums(sections, "Section"),
    content: t.String,
  })

const options = {
  auto: "placeholders",
  fields: {
    content: {
      placeholder: "Ingresa tu comentario",
      multiline: true,
      template: textField,
      numberOfLines: 7,
      config: {
        color: {
          container: REPORTS_COLOR.input.background,
          text: REPORTS_COLOR.input.color,
        },
      },
    },
    section: {
      nullOption: { value: "", text: "Sección" },
      template: selectField,
      config: {
        color: {
          container: REPORTS_COLOR.input.background,
          text: REPORTS_COLOR.input.color,
        },
      },
    },
  },
}

const mapStateToProps = (state, ownProps) => {
  devlog("ownProps", ownProps)
  return {
    sections: state.section.data[ownProps.manualId],
    fetching: state.section.fetching,
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

class ReportsCreate extends Component {
  static propTypes = {
    manualId: PropTypes.number.isRequired,
    manual: PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
    }),
    sections: PropTypes.array.isRequired,
    getSections: PropTypes.func.isRequired,
    newReport: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
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
    const value = this.form.getValue()
    if (value) {
      this.props.newReport({ ...value, manual: this.props.manualId })
      this.setState({
        value: initialValues,
      })
    }
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
        <Row style={{ flex: 0 }}>
          <SubTitle color={REPORTS_COLOR.color}>
            {this.props.manual.name}
          </SubTitle>
          <Icon
            name={this.props.manual.icon}
            style={{ fontSize: 30 }}
            color={REPORTS_COLOR.color}
          />
        </Row>
        <KeyboardAwareScrollView>
          <Form
            ref={form => (this.form = form)}
            options={options}
            type={this.getStruct()}
            value={this.state.value}
            onChange={this.onChange}
          />
          <Button
            title="ENVIAR"
            onPress={this.handleSubmit}
            color={REPORTS_COLOR.input.color}
            backgroundColor={REPORTS_COLOR.input.background}
            disabled={this.props.fetching}
          />
        </KeyboardAwareScrollView>
      </Body>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsCreate)
