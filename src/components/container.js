import styled from "styled-components/native"

export const Body = styled.View`
  flex: 1;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "#fff"};
  align-items: stretch;
  justify-content: center;
  padding: 30px 30px;
`

export const ScrollView = styled.ScrollView``

export const Container = styled.View`
  display: flex;
  flex: 1;
`

export const Row = styled(Container)`
  flex-flow: row nowrap;
  justify-content: space-around;
`

export const FormContainer = styled(Container)`
  flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;
`

export const EventContainer = styled(Container)`
  flex-flow: column nowrap;
  justify-content: center;
  margin: 5px 0;
`
