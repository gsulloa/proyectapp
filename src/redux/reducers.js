import { persistCombineReducers } from "redux-persist"
import storage from "redux-persist/es/storage" // default: AsyncStorage

import hydratation from "./modules/hydratation"
import routes from "./modules/routes"
import authentication from "./modules/authentication"
import community from "./modules/community"
import witchMail from "./modules/witchMail"
import manual from "./modules/manual"
import section from "./modules/section"
import event from "./modules/event"
import netinfo from "./modules/netinfo"
import offline from "./modules/offline"
import report from "./modules/report"

import { toastReducer as toast } from "react-native-redux-toast"

const config = {
  key: "root",
  storage,
  blacklist: ["hydratation", "routes", "netinfo", "toast"],
}

const reducer = persistCombineReducers(config, {
  hydratation,
  routes,
  authentication,
  community,
  witchMail,
  manual,
  section,
  event,
  netinfo,
  offline,
  report,
  toast,
})

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_STORE") {
    const { hydratation } = state
    state = { hydratation }
  }
  return reducer(state, action)
}

export default rootReducer
