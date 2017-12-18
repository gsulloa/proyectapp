import styled from "styled-components/native"

export const Body = styled.View`
  flex: 1;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "#fff"};
  align-items: center;
  justify-content: center;
  padding: 5px 30px;
`

export const FormContainer = styled.View``
