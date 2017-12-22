import React from "react"
import styled from "styled-components/native"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Button } from "./form"

import { logoutUser } from "../redux/modules/authentication"

const DrawerView = styled.View`
  margin: 30px 15px;
  flex: 1;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
`

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
})

class DrawerContent extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  render() {
    return (
      <DrawerView>
        <Button onPress={this.props.logout} title="Logout" color="red" />
      </DrawerView>
    )
  }
}

export default connect(null, mapDispatchToProps)(DrawerContent)
