import React, { Component } from "react"
import PropTypes from "prop-types"
import { StatusBar } from "react-native"
import { Provider, connect } from "react-redux"
import styled from "styled-components/native"
import { Font } from "expo"

import { netinfoConfig } from "./redux/modules/netinfo"
import { hydrate } from "./redux/modules/hydratation"
import { devlog } from "./utils/log"
import { Toast } from "react-native-redux-toast"

import Nav from "./Nav"
import { Container } from "./components/container"

const Screen = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`

const mapStateToProps = state => ({
  hydratation: state.hydratation,
})

const mapDispatchToProps = {
  hydrate,
}

export class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    hydratation: PropTypes.object.isRequired,
    hydrate: PropTypes.func.isRequired,
    options: PropTypes.object,
  }
  state = {
    fontLoaded: false,
  }

  componentWillMount = () => {
    const { store, hydrate, options } = this.props
    hydrate(store, options.hydratation)
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      "whitney-bold": require("../assets/fonts/whitneyboldsc.otf"),
      "whitney-light": require("../assets/fonts/whitneylight.otf"),
      "whitney-light-italic": require("../assets/fonts/whitneylightitalic.otf"),
      whitney: require("../assets/fonts/whitneymedium.otf"),
      ProyectappIcons: require("../assets/icons/proyectapp-icons.ttf"),
    })
    this.setState({ fontLoaded: true })
    netinfoConfig(this.props.store)
  }

  render = () => {
    devlog("App", this.state, this.props)
    if (!this.props.hydratation.done || !this.state.fontLoaded) {
      return null
    }
    return (
      <Screen>
        <StatusBar hidden />
        <Provider store={this.props.store}>
          <Container>
            <Nav />
            <Toast />
          </Container>
        </Provider>
      </Screen>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
