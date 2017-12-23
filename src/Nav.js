import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Icon } from "react-native-elements"
import DrawerComponent from "./components/DrawerComponent"

import WitchMailIndex from "./screens/witchMail/WitchMailIndex"

import Login from "./screens/Login"

import { Scene, Router, Tabs, Stack, Drawer } from "react-native-router-flux"
import { WITCH_MAIL_COLOR } from "./components/colors"
import WitchMailCreate from "./screens/witchMail/WitchMailCreate"
import WitchMailBox from "./screens/witchMail/WitchMailBox"
import WitchMailShow from "./screens/witchMail/WitchMailShow"
import Reports from "./screens/reports/Reports"
import ReportsCreate from "./screens/reports/ReportsCreate"
import Calendar from "./screens/calendar/Calendar"
import EventCreate from "./screens/calendar/EventCreate"
import { Button } from "react-native"

const ConnectedRouter = connect()(Router)

const Er = () => {
  return <Button onPress={() => {throw new Error("throwing error")}} title="error!" />
}

class Nav extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  }
  render = () => {
    return (
      <ConnectedRouter>
        <Stack key="root" hideNavBar>
          <Drawer key="drawer" contentComponent={DrawerComponent}>
            <Tabs
              hideNavBar
              key="authenticatedRoot"
              activeBackgroundColor={WITCH_MAIL_COLOR}
            >
              <Stack key="reports" icon={() => <Icon name="report" />}>
                <Scene key="reportsIndex" component={Reports} />
                <Scene key="reportsCreate" component={ReportsCreate} back />
              </Stack>
              <Stack
                key="calendar"
                icon={() => <Icon name="calendar" type="font-awesome" />}
              >
                <Scene key="calendarIndex" component={Calendar} />
                <Scene key="eventCreate" component={EventCreate} back />
              </Stack>
              <Stack
                key="witchMail"
                icon={() => <Icon name="ios-mail" type="ionicon" />}
              >
                <Scene key="witchMailIndex" component={WitchMailIndex} />
                <Scene key="witchMailShow" component={WitchMailShow} back />
                <Scene key="witchMailCreate" component={WitchMailCreate} back />
                <Scene key="witchMailBox" component={WitchMailBox} back />
              </Stack>
              <Scene key="error" component={Er} />
            </Tabs>
          </Drawer>
          <Scene
            key="signIn"
            component={Login}
            title="login"
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
