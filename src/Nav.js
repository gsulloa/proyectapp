import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Icon } from "react-native-elements"

import WitchMailIndex from "./screens/witchMail/WitchMailIndex"

import Login from "./screens/Login"

import { Scene, Router, Tabs, Stack } from "react-native-router-flux"
import { WITCH_MAIL_COLOR } from "./components/colors"
import WitchMailCreate from "./screens/witchMail/WitchMailCreate"
import WitchMailBox from "./screens/witchMail/WitchMailBox"
import WitchMailShow from "./screens/witchMail/WitchMailShow"

const ConnectedRouter = connect()(Router)

class Nav extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  }
  render = () => {
    return (
      <ConnectedRouter>
        <Stack key="root">
          <Tabs
            key="authenticatedRoot"
            hideNavBar
            activeBackgroundColor={WITCH_MAIL_COLOR}
            activeTintColor="white"
            inactiveTintColor="white"
          >
            <Stack
              key="witchMail"
              icon={() => <Icon name="ios-mail" type="ionicon" />}
            >
              <Scene key="witchMailIndex" component={WitchMailIndex} />
              <Scene key="witchMailShow" component={WitchMailShow} />
              <Scene key="witchMailCreate" component={WitchMailCreate} />
              <Scene key="witchMailBox" component={WitchMailBox} />
            </Stack>
          </Tabs>
          <Scene
            key="signIn"
            component={Login}
            title="login"
            hideNavBar
            initial={!this.props.authenticated}
          />
        </Stack>
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
