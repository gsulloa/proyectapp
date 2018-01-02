import React from "react"
import { Container } from "../container"
import { InputField } from "../form"
import {
  Text,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableNativeFeedback,
} from "react-native"
import { getDate, getTime, getDatetime } from "../../utils/datetime"

function datepicker(locals) {
  if (locals.hidden) {
    return null
  }

  var stylesheet = locals.stylesheet
  var formGroupStyle = stylesheet.formGroup.normal
  // var datepickerStyle = stylesheet.datepicker.normal
  var helpBlockStyle = stylesheet.helpBlock.normal
  var errorBlockStyle = stylesheet.errorBlock
  var dateValueStyle = stylesheet.dateValue.normal

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error
    // datepickerStyle = stylesheet.datepicker.error
    helpBlockStyle = stylesheet.helpBlock.error
    dateValueStyle = stylesheet.dateValue.error
  }

  // Setup the picker mode
  var datePickerMode = locals.mode
  if (
    datePickerMode !== "date" &&
    datePickerMode !== "time" &&
    datePickerMode !== "datetime"
  ) {
    throw new Error(`Unrecognized date picker format ${datePickerMode}`)
  }

  /**
   * Check config locals for Android datepicker.
   * `locals.config.background: `TouchableNativeFeedback` background prop
   * `locals.config.format`: Date format function
   * `locals.config.dialogMode`: 'calendar', 'spinner', 'default'
   * `locals.config.dateFormat`: Date only format
   * `locals.config.timeFormat`: Time only format
   */
  var formattedValue = getDatetime(locals.value)
  var background = TouchableNativeFeedback.SelectableBackground() // eslint-disable-line new-cap
  var dialogMode = "default"
  var formattedDateValue = getDate(locals.value)
  var formattedTimeValue = getTime(locals.value)
  if (locals.config) {
    if (locals.config.format) {
      formattedValue = locals.config.format(locals.value)
    }
    if (locals.config.background) {
      background = locals.config.background
    }
    if (locals.config.dialogMode) {
      dialogMode = locals.config.dialogMode
    }
    if (locals.config.dateFormat) {
      formattedDateValue = locals.config.dateFormat(locals.value)
    }
    if (locals.config.timeFormat) {
      formattedTimeValue = locals.config.timeFormat(locals.value)
    }
  }

  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null
  var value = locals.value ? (
    <Text style={dateValueStyle}>{formattedValue}</Text>
  ) : null

  return (
    <Container style={formGroupStyle}>
      {datePickerMode === "datetime" ? (
        <Container>
          <InputField color={locals.config.color.container}>
            <TouchableNativeFeedback
              accessible={true}
              disabled={locals.disabled}
              ref="input"
              background={background}
              onPress={function() {
                let config = {
                  date: locals.value || new Date(),
                  mode: dialogMode,
                }
                if (locals.minimumDate) {
                  config.minDate = locals.minimumDate
                }
                if (locals.maximumDate) {
                  config.maxDate = locals.maximumDate
                }
                DatePickerAndroid.open(config).then(function(date) {
                  if (date.action !== DatePickerAndroid.dismissedAction) {
                    var newDate = new Date(locals.value)
                    newDate.setFullYear(date.year, date.month, date.day)
                    locals.onChange(newDate)
                  }
                })
                if (typeof locals.onPress === "function") {
                  locals.onPress()
                }
              }}
            >
              <Container>
                <Text style={dateValueStyle}>{formattedDateValue}</Text>
              </Container>
            </TouchableNativeFeedback>
          </InputField>
          <InputField color={locals.config.color.container}>
            <TouchableNativeFeedback
              accessible={true}
              disabled={locals.disabled}
              ref="input"
              background={background}
              onPress={function() {
                const now = new Date()
                const isDate = locals.value && locals.value instanceof Date
                let setTime = {
                  hour: isDate ? locals.value.getHours() : now.getHours(),
                  minute: isDate ? locals.value.getMinutes() : now.getMinutes(),
                }
                TimePickerAndroid.open({
                  is24Hour: true,
                  hour: setTime.hour,
                  minute: setTime.minute,
                }).then(function(time) {
                  if (time.action !== TimePickerAndroid.dismissedAction) {
                    const newTime = new Date(locals.value)
                    newTime.setHours(time.hour)
                    newTime.setMinutes(time.minute)
                    locals.onChange(newTime)
                  }
                })
                if (typeof locals.onPress === "function") {
                  locals.onPress()
                }
              }}
            >
              <Container>
                <Text style={dateValueStyle}>{formattedTimeValue}</Text>
              </Container>
            </TouchableNativeFeedback>
          </InputField>
        </Container>
      ) : (
        <InputField color={locals.config.color.container}>
          <TouchableNativeFeedback
            accessible={true}
            disabled={locals.disabled}
            ref="input"
            background={background}
            onPress={function() {
              if (datePickerMode === "time") {
                const now = new Date()
                const isDate = locals.value && locals.value instanceof Date
                let setTime = {
                  hour: isDate ? locals.value.getHours() : now.getHours(),
                  minute: isDate ? locals.value.getMinutes() : now.getMinutes(),
                }
                TimePickerAndroid.open({
                  is24Hour: true,
                  hour: setTime.hour,
                  minute: setTime.minute,
                }).then(function(time) {
                  if (time.action !== TimePickerAndroid.dismissedAction) {
                    const newTime = new Date()
                    newTime.setHours(time.hour)
                    newTime.setMinutes(time.minute)
                    locals.onChange(newTime)
                  }
                })
              } else if (datePickerMode === "date") {
                let config = {
                  date: locals.value || new Date(),
                  mode: dialogMode,
                }
                if (locals.minimumDate) {
                  config.minDate = locals.minimumDate
                }
                if (locals.maximumDate) {
                  config.maxDate = locals.maximumDate
                }
                DatePickerAndroid.open(config).then(function(date) {
                  if (date.action !== DatePickerAndroid.dismissedAction) {
                    var newDate = new Date(date.year, date.month, date.day)
                    locals.onChange(newDate)
                  }
                })
              }
              if (typeof locals.onPress === "function") {
                locals.onPress()
              }
            }}
          >
            <Container>{value}</Container>
          </TouchableNativeFeedback>
        </InputField>
      )}
      {help}
      {error}
    </Container>
  )
}

export default datepicker
