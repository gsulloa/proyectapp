import { persistCombineReducers } from "redux-persist"
import storage from "redux-persist/es/storage" // default: AsyncStorage

import hydratation from "./modules/hydratation"
import routes from "./modules/routes"

const config = {
  key: "root",
  storage,
}

function test(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    default:
      return state
  }
}

const reducer = persistCombineReducers(config, {
  hydratation,
  routes,
  test,
})

export default reducer
