import { compose, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import promiseMiddleware from "redux-promise-middleware"
// import { routerMiddleware } from "react-router-redux"

import reducers from "./reducers"

export default function configureStore(initialState = {}, { api } = {}) {
  const shouldLog = process.env.NODE_ENV === "development"

  // Setup middleware
  const middleware = [
    thunk.withExtraArgument({ api }),
    promiseMiddleware(),
    // routerMiddleware(history),
  ]
  if (shouldLog) {
    middleware.push(logger)
  }

  // Setup middlewares and enhancers
  const enhancer = compose(applyMiddleware(...middleware))

  // Create redux store
  const store = createStore(reducers, initialState, enhancer)

  return store
}
