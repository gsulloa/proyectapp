import styled from "styled-components/native"

export const Title = styled.Text`
  color: ${props => (props.color ? props.color : "black")};
  font-size: 40px;
`
