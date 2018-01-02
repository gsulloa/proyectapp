import React from "react"
import styled from "styled-components/native"
import { connect } from "react-redux"
import { List, ListItem, Avatar } from "react-native-elements"
import PropTypes from "prop-types"
import { CenterText } from "./text"
import { Button } from "./form"

import { logoutUser } from "../redux/modules/authentication"
import { NoFlexRow as Row, Container, CenterRow } from "./container"
import { Actions } from "react-native-router-flux"
import { PROYECTA_COLOR } from "./colors";

const DrawerView = styled.View`
  margin: 30px 15px;
  flex: 1;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
`

const mapStateToProps = state => {
  const community = state.community.data.find(
    c => c.id === state.authentication.data.communityId
  )
  return {
    name: state.authentication.data.name,
    email: state.authentication.data.email,
    community: community
      ? community.name
      : state.authentication.data.communityId,
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
})

const getInitials = fullName => {
  let initials = fullName.match(/\b\w/g) || []
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase()
  return initials
}

class DrawerContent extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
    name: PropTypes.string,
    email: PropTypes.string,
    community: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  render() {
    return (
      <DrawerView>
        <Row>
          <Avatar
            medium
            rounded
            title={getInitials(this.props.name)}
            overlayContainerStyle={{ backgroundColor: PROYECTA_COLOR }}
          />
          <Container>
            <CenterText>{this.props.name}</CenterText>
            <CenterText>{this.props.email}</CenterText>
            <CenterText>Comunidad: {this.props.community}</CenterText>
          </Container>
        </Row>
        <List containerStyle={{ marginBottom: 20 }}>
          <ListItem
            title="Comentarios"
            onPress={() => Actions.replace("reports")}
          />
          <ListItem
            title="Calendario de Eventos"
            onPress={() => Actions.replace("calendar")}
          />
          <ListItem
            title="Correo de Brujas"
            onPress={() => Actions.replace("witchMail")}
          />
          <ListItem
            title="Himno de Proyecta"
            onPress={() => Actions.push("anthem")}
          />
          <ListItem
            title="Logout"
            onPress={this.props.logout}
            style={{ color: "red" }}
          />
        </List>
      </DrawerView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
