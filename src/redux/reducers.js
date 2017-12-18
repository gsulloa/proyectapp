import { persistCombineReducers } from "redux-persist"
import storage from "redux-persist/es/storage" // default: AsyncStorage

import hydratation from "./modules/hydratation"
import routes from "./modules/routes"
import authentication from "./modules/authentication"

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
  authentication,
  test,
})

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_STORE") {
    const { hydratation } = state
    state = { hydratation }
  }
  return reducer(state, action)
}

export default rootReducer
