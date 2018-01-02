import React from "react"
import { Icon } from "react-native-elements"

import { Container, IconContainer } from "../container"
import { InputField, TextInput } from "../form"
import { Text } from "../text"

export default function textField(locals) {
  if (locals.hidden) {
    return null
  }

  let stylesheet = locals.stylesheet
  let formGroupStyle = stylesheet.formGroup.normal
  let textboxViewStyle = stylesheet.textboxView.normal
  let helpBlockStyle = stylesheet.helpBlock.normal
  let errorBlockStyle = stylesheet.errorBlock

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error
    textboxViewStyle = stylesheet.textboxView.error
    helpBlockStyle = stylesheet.helpBlock.error
  }

  if (locals.editable === false) {
    textboxViewStyle = stylesheet.textboxView.notEditable
  }

  let help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null
  let error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null
  return (
    <Container style={formGroupStyle}>
      <InputField
        style={textboxViewStyle}
        color={locals.config.color.container}
      >
        {locals.config.iconProps ? (
          <IconContainer>
            <Icon {...locals.config.iconProps} />
          </IconContainer>
        ) : (
          undefined
        )}
        <TextInput
          accessibilityLabel={locals.label}
          autoCapitalize={locals.autoCapitalize}
          autoCorrect={locals.autoCorrect}
          autoFocus={locals.autoFocus}
          blurOnSubmit={locals.blurOnSubmit}
          editable={locals.editable}
          keyboardType={locals.keyboardType}
          maxLength={locals.maxLength}
          multiline={locals.multiline}
          onBlur={locals.onBlur}
          onEndEditing={locals.onEndEditing}
          onFocus={locals.onFocus}
          onLayout={locals.onLayout}
          onSelectionChange={locals.onSelectionChange}
          onSubmitEditing={locals.onSubmitEditing}
          onContentSizeChange={locals.onContentSizeChange}
          placeholderTextColor={locals.placeholderTextColor}
          secureTextEntry={locals.secureTextEntry}
          selectTextOnFocus={locals.selectTextOnFocus}
          selectionColor={locals.selectionColor}
          numberOfLines={locals.numberOfLines}
          underlineColorAndroid={locals.underlineColorAndroid}
          clearButtonMode={locals.clearButtonMode}
          clearTextOnFocus={locals.clearTextOnFocus}
          enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
          keyboardAppearance={locals.keyboardAppearance}
          onKeyPress={locals.onKeyPress}
          returnKeyType={locals.returnKeyType}
          selectionState={locals.selectionState}
          onChangeText={value => locals.onChange(value)}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          value={locals.value}
          style={{
            color: locals.config.color.text,
          }}
        />
      </InputField>
      {help}
      {error}
    </Container>
  )
}
