import React from "react"
import styled from "styled-components/native"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { CenterText } from "./text"
import { Button } from "./form"

import { logoutUser } from "../redux/modules/authentication"

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
        <CenterText>
          Iniciaste sesión como {this.props.name} ({this.props.email})
        </CenterText>
        <CenterText>Comunidad {this.props.community}</CenterText>
        <Button onPress={this.props.logout} title="Logout" color="red" />
      </DrawerView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
