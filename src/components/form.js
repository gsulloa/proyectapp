import React from "react"
import styled from "styled-components/native"
import PropTypes from "prop-types"
import { Icon } from "react-native-elements"

import { ButtonText as Text } from "./text"
import { CenterRow as CenterRowContainer } from "./container"

export const Form = styled.View`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`

/**********
INPUTS
***********/
export const TextInput = styled.TextInput`
  width: 80%;
`

export const InputField = styled.View`
  background-color: ${props => (props.color ? props.color : undefined)};
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  margin: 10px 0;
`

/**********
Buttons
***********/

const TouchableHighlight = styled.TouchableHighlight`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
  margin: 10px 20px 10px 0;
  flex: 1;
`
const ButtonView = styled.View`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
  opacity: 0.3;
  margin: 10px 20px 10px 0;
  flex: 1;
`

const CenterRow = styled(CenterRowContainer)`
  padding: 10px 20px;
  flex: 1;
`

const RightIconContainer = styled.View`
  position: absolute;
  right: 20px;
`

export const Button = ({
  disabled,
  backgroundColor,
  title,
  onPress,
  icon,
  ...props
}) => {
  const button = (
    <CenterRow>
      <Text textAlign="center" {...props}>
        {title}
      </Text>
      {icon ? (
        <RightIconContainer>
          <Icon {...icon} color={props.color} />
        </RightIconContainer>
      ) : (
        undefined
      )}
    </CenterRow>
  )
  if (disabled) {
    return <ButtonView backgroundColor={backgroundColor}>{button}</ButtonView>
  } else {
    return (
      <TouchableHighlight backgroundColor={backgroundColor} onPress={onPress}>
        {button}
      </TouchableHighlight>
    )
  }
}
Button.propTypes = {
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
  }),
}
