import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import _ from "lodash/collection"

import { Text } from "../../components/text"
import { Body } from "../../components/container"
import { WITCH_MAIL_COLOR } from "../../components/colors"
import { Button } from "../../components/form"
import { Actions } from "react-native-router-flux"
import { getWitchMails } from "../../redux/modules/witchMail"

const mapStateToProps = state => ({
  witchMails: state.witchMail.data,
  communities: state.community.data,
})

const mapDispatchToProps = dispatch => ({
  getWitchMails: () => dispatch(getWitchMails()),
})

class WitchMailIndex extends Component {
  static propTypes = {
    getWitchMails: PropTypes.func.isRequired,
    witchMails: PropTypes.array.isRequired,
    communities: PropTypes.array.isRequired,
  }
  static defaultProps = {
    witchMails: [],
    communities: [],
  }
  filterWitchMails = () => {
    return _.filter(this.props.witchMails, witchMail => !witchMail.seen)
  }
  downloadMails = () => {
    this.props.getWitchMails()
  }
  readMail = () => {
    const filteredWitchMails = this.filterWitchMails()
    if (filteredWitchMails.length) {
      const witchMail = _.shuffle(filteredWitchMails)[0]
      const community = this.props.communities.find(
        c => c.id === witchMail.senderId
      )
      Actions.witchMailShow({
        witchMail: {
          ...witchMail,
          community: community ? community.name : witchMail.senderId,
        },
      })
    }
  }
  render = () => {
    const witchMailsRemaining = this.filterWitchMails().length
    return (
      <Body backgroundColor={WITCH_MAIL_COLOR.background}>
        {witchMailsRemaining
          ? [
              <Text key="countInfo">
                Te queda{witchMailsRemaining - 1 ? "n " : " "}
                {witchMailsRemaining} correo{witchMailsRemaining - 1
                  ? "s "
                  : " "}
                por leer
              </Text>,
              <Button
                key="readButton"
                title="LEER UNO"
                onPress={this.readMail}
                color={WITCH_MAIL_COLOR.input.color}
                backgroundColor={WITCH_MAIL_COLOR.input.background}
              />,
            ]
          : undefined}
        <Button
          title="DESCARGAR CORREOS"
          onPress={this.downloadMails}
          color={WITCH_MAIL_COLOR.input.color}
          backgroundColor={WITCH_MAIL_COLOR.input.background}
        />
      </Body>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WitchMailIndex)
