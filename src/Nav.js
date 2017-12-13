import React, { Component } from "react"
import { connect } from "react-redux"
import { Comp1, Comp2 } from "./screens/Home"

import {
  Scene,
  Router,
  Tabs,
  Stack,
  Actions,
  /*
  Reducer,
  ActionConst,
  Overlay,
  Modal,
  Drawer,
  Stack,
  Lightbox,
*/
} from "react-native-router-flux"

const ConnectedRouter = connect()(Router)

class Nav extends Component {
  render = () => {
    return (
      <ConnectedRouter>
        <Scene key="root" tabs>
          <Scene key="comp1" component={Comp1} title="Comp1" />
          <Scene key="comp2" component={Comp2} title="Comp2" />
        </Scene>
      </ConnectedRouter>
    )
  }
}

export default Nav
