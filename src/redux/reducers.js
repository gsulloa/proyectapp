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

const config = {
  key: "root",
  storage,
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
})

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_STORE") {
    const { hydratation } = state
    state = { hydratation }
  }
  return reducer(state, action)
}

export default rootReducer
