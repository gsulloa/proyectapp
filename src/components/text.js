import styled from "styled-components/native"

export const Title = styled.Text`
  color: ${props => (props.color ? props.color : "black")};
  font-size: 40px;
  text-align: center;
  font-family: whitney-bold;
`
export const SubTitle = styled.Text`
  color: ${props => (props.color ? props.color : "black")};
  font-size: 30px;
  text-align: left;
  font-family: whitney-bold;
`

export const Text = styled.Text`
  color: ${props => (props.color ? props.color : "black")};
  text-align: ${props => (props.textAlign ? props.textAlign : "left")};
  font-family: whitney;
`

export const ButtonText = styled(Text)`
  font-family: whitney-bold;
  font-size: 20px;
`

export const CenterText = styled(Text)`
  text-align: center;
`
