import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Comp1, Comp2 } from "./screens/Home"

import Login from "./screens/Login"

import { Scene, Router, Tabs, Stack } from "react-native-router-flux"

const ConnectedRouter = connect()(Router)

class Nav extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  }
  render = () => {
    return (
      <ConnectedRouter>
        {this.props.authenticated ? (
          <Tabs key="authenticated_root">
            <Scene key="comp1" component={Comp1} title="Comp1" />
            <Scene key="comp2" component={Comp2} title="Comp2" />
          </Tabs>
        ) : (
          <Stack key="sign_in_root">
            <Scene key="sign_in" component={Login} title="login" hideNavBar />
          </Stack>
        )}
      </ConnectedRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Nav)
