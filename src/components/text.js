import styled from "styled-components/native"

export const Title = styled.Text`
  color: ${props => (props.color ? props.color : "black")};
  font-size: 40px;
  text-align: center;
`

export const Text = styled.Text`
  color: ${props => (props.color ? props.color : "black")};
`

export const CenterText = styled(Text)`
  text-align: center;
`
