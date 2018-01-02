import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Icon } from "./components/icons"
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
import Anthem from "./screens/Anthem";

const ConnectedRouter = connect()(Router)

const StyledIcon = props => <Icon style={{ fontSize: 30 }} {...props} />

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
              activeBackgroundColor={WITCH_MAIL_COLOR.background}
              showLabel={false}
            >
              <Stack
                key="reports"
                icon={() => <StyledIcon name="manual" />}
                title="Comentarios"
              >
                <Scene key="reportsIndex" component={Reports} />
                <Scene key="reportsCreate" component={ReportsCreate} back />
              </Stack>
              <Stack
                key="calendar"
                icon={() => <StyledIcon name="calendar" />}
                title="Calendario"
              >
                <Scene key="calendarIndex" component={Calendar} />
                <Scene key="eventCreate" component={EventCreate} back />
              </Stack>
              <Stack
                key="witchMail"
                icon={() => <StyledIcon name="witch-mail" />}
                title="Correo de Brujas"
              >
                <Scene key="witchMailIndex" component={WitchMailIndex} />
                <Scene key="witchMailShow" component={WitchMailShow} back />
                <Scene key="witchMailCreate" component={WitchMailCreate} back />
                <Scene key="witchMailBox" component={WitchMailBox} back />
              </Stack>
            </Tabs>
            <Scene
              key="anthem"
              component={Anthem}
              title="Himno Proyecta"
              back
            />
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
WITCH_MAIL_COLOR
WITCH_MAIL_COLOR
const mapStateToProps = state => {
  return {
    authenticated: state.authentication.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Nav)
