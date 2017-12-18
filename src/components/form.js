import React from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native"
import { Icon } from "react-native-elements"

export const Form = styled.View`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`

/**********
INPUTS
***********/
export const TextInput = styled.TextInput`
  width: 100%;
`

export const InputField = styled.View`
  background-color: #b8dee9;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin: 10px 0;
`

const IconContainer = styled.View`
  padding: 5px;
`

export function iconField(locals) {
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
    <View style={formGroupStyle}>
      <InputField style={textboxViewStyle}>
        <IconContainer>
          <Icon {...locals.config.iconProps} />
        </IconContainer>
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
        />
      </InputField>
      {help}
      {error}
    </View>
  )
}

/**********
Buttons
***********/

export const Button = styled.Button`
  align-self: ${props => (props.alignSelf ? props.alignSelf : "flex-end")};
`
