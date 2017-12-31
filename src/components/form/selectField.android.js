import React from "react"
import { Text, Picker } from "react-native"
import { Container } from "../container"
import { InputField } from "../form"

function select(locals) {
  if (locals.hidden) {
    return null
  }

  var stylesheet = locals.stylesheet
  var formGroupStyle = stylesheet.formGroup.normal
  var controlLabelStyle = stylesheet.controlLabel.normal
  var selectStyle = Object.assign(
    {},
    stylesheet.select.normal,
    stylesheet.pickerContainer.normal
  )
  var helpBlockStyle = stylesheet.helpBlock.normal
  var errorBlockStyle = stylesheet.errorBlock

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error
    controlLabelStyle = stylesheet.controlLabel.error
    selectStyle = stylesheet.select.error
    helpBlockStyle = stylesheet.helpBlock.error
  }

  var label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null
  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null

  var options = locals.options.map(({ value, text }) => (
    <Picker.Item key={value} value={value} label={text} />
  ))

  return (
    <Container style={formGroupStyle}>
      {label}
      <InputField color={locals.config.color.container}>
        <Picker
          accessibilityLabel={locals.label}
          ref="input"
          style={[selectStyle, { flex: 1 }]}
          selectedValue={locals.value}
          onValueChange={locals.onChange}
          help={locals.help}
          enabled={locals.enabled}
          mode={locals.mode}
          prompt={locals.prompt}
          itemStyle={locals.itemStyle}
        >
          {options}
        </Picker>
      </InputField>
      {help}
      {error}
    </Container>
  )
}

module.exports = select
