import React from "react"
import { connect } from "react-redux"
import { Text, TouchableHighlight } from "react-native"
import styled from "styled-components/native"

import { Actions } from "react-native-router-flux"

const Body = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

export const Comp1 = connect(state => ({ count: state.test }))(props => (
  <Body>
    <Text>Open up App.js to start working on your app!</Text>
    <Text>Changes you make will automatically reload.</Text>
    <Text>Shake your phone to open the developer menu.</Text>
    <Text>Hello!!!</Text>
    <TouchableHighlight onPress={() => Actions.stack_comp2()}>
      <Text>See everything!</Text>
    </TouchableHighlight>
    <Text>{JSON.stringify(props)}</Text>
    <Text>{props.count}</Text>
  </Body>
))

export const Comp2 = connect()(props => (
  <Body>
    <Text>Woho</Text>
    <Text>{JSON.stringify(props.state)}</Text>
    <TouchableHighlight onPress={() => props.dispatch({ type: "INCREMENT" })}>
      <Text>See everything!</Text>
    </TouchableHighlight>
  </Body>
))

/*
class Home extends Component {
  render = () => {
    return <ConnectedRouter scenes={Scenes} />
  }
}
*/
export default Comp1
