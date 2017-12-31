import React, { Component } from "react"
import PropTypes from "prop-types"
import { StatusBar } from "react-native"
import { Provider, connect } from "react-redux"
import styled from "styled-components/native"
import { Font } from "expo"

import { hydrate } from "./redux/modules/hydratation"
import { devlog } from "./utils/log"

import Nav from "./Nav"

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
    })
    this.setState({ fontLoaded: true })
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
          <Nav />
        </Provider>
      </Screen>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
