import React, { Component } from "react"
import { Actions } from "react-native-router-flux"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Title, Text } from "../../components/text"
import { Body } from "../../components/container"
import { WITCH_MAIL_COLOR } from "../../components/colors"
import { devlog } from "../../utils/log"
import { Icon } from "react-native-elements"
import { setRead } from "../../redux/modules/witchMail"

const mapDispatchToProps = (dispatch, ownProps) => ({
  setRead: () => dispatch(setRead(ownProps.witchMail.id)),
})

class WitchMailShow extends Component {
  static propTypes = {
    witchMail: PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    setRead: PropTypes.func.isRequired,
  }
  static defaultProps = {
    witchMail: {
      content: "",
    },
  }
  handleComplete = () => {
    this.props.setRead()
    Actions.pop()
  }
  render = () => {
    devlog("WitchMailShow", this.props)
    return (
      <Body backgroundColor={WITCH_MAIL_COLOR}>
        <Text>{this.props.witchMail.content}</Text>
        <Icon
          reverse
          name="check"
          type="entypo"
          onPress={this.handleComplete}
        />
      </Body>
    )
  }
}

export default connect(null, mapDispatchToProps)(WitchMailShow)
