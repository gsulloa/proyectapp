import React, { Component } from "react"
import PropTypes from "prop-types"
import { Agenda as RNAgenda } from "react-native-calendars"

import { CenterText, Text } from "./text"
import { EventContainer, Row } from "./container"

import { LocaleConfig } from "react-native-calendars"

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ],
  dayNamesShort: ["D", "L", "M", "W", "J", "V", "S"],
}
LocaleConfig.defaultLocale = "es"

export const Agenda = props => {
  return (
    <RNAgenda
      renderItem={item => (
        <EventContainer>
          <CenterText>{item.community}</CenterText>
          <Row>
            <Text>{item.title}</Text>
            <Text>{item.time}</Text>
          </Row>
        </EventContainer>
      )}
      renderEmptyDate={() => undefined}
      rowHasChanged={(r1, r2) => {
        return r1.name !== r2.name
      }}
      firstDay={1}
      pastScrollRange={0}
      futureScrollRange={0}
      scrollEnabled={false}
      {...props}
    />
  )
}
