import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { Body } from "../../components/container"
import { REPORTS_COLOR } from "../../components/colors"
import { Button } from "../../components/form"
import { Actions } from "react-native-router-flux"
import { getManuals } from "../../redux/modules/manual"

import { devlog } from "../../utils/log"

const mapStateToProps = state => ({
  manuals: state.manual.data,
})
const mapDispatchToProps = dispatch => ({
  getManuals: () => dispatch(getManuals()),
})

class Reports extends Component {
  static propTypes = {
    manuals: PropTypes.array.isRequired,
    getManuals: PropTypes.func.isRequired,
  }
  static defaultProps = {
    manuals: [],
  }
  componentWillMount = () => {
    this.props.getManuals()
  }
  render = () => {
    devlog("Reports", this.props)
    return (
      <Body backgroundColor={REPORTS_COLOR.background}>
        {this.props.manuals.map(manual => {
          return (
            <Button
              key={manual.id}
              title={manual.name.toUpperCase()}
              onPress={() => Actions.reportsCreate({ manualId: manual.id })}
              color={REPORTS_COLOR.color}
            />
          )
        })}
      </Body>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
