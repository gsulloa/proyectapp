import React, { Component } from "react"
import { Actions } from "react-native-router-flux"
import { Icon } from "react-native-elements"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Agenda } from "../../components/calendar"

import { Body } from "../../components/container"
import { CALENDAR_COLOR } from "../../components/colors"

import { devlog } from "../../utils/log"
import { getEvents } from "../../redux/modules/event"
import { getCommunities } from "../../redux/modules/community"
import { getDate, addZero } from "../../utils/datetime"

const mapStateToProps = state => ({
  communities: state.community.data,
  events: state.event.data,
  fetching: state.event.fetching || state.community.fetching,
})
const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(getEvents()),
  getCommunities: () => dispatch(getCommunities()),
})

class Calendar extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    communities: PropTypes.array.isRequired,
    getEvents: PropTypes.func.isRequired,
    getCommunities: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    events: [],
    communities: [],
  }
  formatEvents = () => {
    const firstDay = 1
    const lastDay = 20
    const items = {}
    for (let day = firstDay; day <= lastDay; day++) {
      items[`2018-01-${addZero(day)}`] = []
    }
    this.props.events.forEach(event => {
      if (!items[event.date]) {
        items[event.date] = []
      }
      const community = this.props.communities.find(
        c => c.id === event.communityId
      )
      items[event.date].push({
        ...event,
        community: community ? community.name : event.communityId,
      })
    })
    return items
  }
  componentWillMount = async () => {
    await this.props.getCommunities()
    this.props.getEvents()
  }
  handleNewEvent = () => {
    Actions.eventCreate()
  }
  render = () => {
    devlog("Calendar", this.props)
    if (this.props.fetching) return <Body />
    return (
      <Body backgroundColor={CALENDAR_COLOR.background}>
        <Agenda
          selected={getDate(new Date())}
          items={this.formatEvents()}
          minDate={"2018-01-01"}
          maxDate={"2018-01-20"}
        />
        <Icon
          reverse
          name="plus"
          onPress={this.handleNewEvent}
          type="foundation"
        />
      </Body>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
