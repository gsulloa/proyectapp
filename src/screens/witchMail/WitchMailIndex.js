import React, { Component } from "react"

import { Body } from "../../components/container"
import { WITCH_MAIL_COLOR } from "../../components/colors"
import { Button } from "../../components/form"
import { Actions } from "react-native-router-flux"

class WitchMailIndex extends Component {
  render = () => {
    return (
      <Body backgroundColor={WITCH_MAIL_COLOR.background}>
        <Button
          title="ESCRIBIR CORREO"
          onPress={() => Actions.witchMailCreate()}
          color={WITCH_MAIL_COLOR.input.color}
          backgroundColor={WITCH_MAIL_COLOR.input.background}
        />
        <Button
          title="BANDEJA DE ENTRADA"
          onPress={() => Actions.witchMailBox()}
          color={WITCH_MAIL_COLOR.input.color}
          backgroundColor={WITCH_MAIL_COLOR.input.background}
        />
      </Body>
    )
  }
}

export default WitchMailIndex
