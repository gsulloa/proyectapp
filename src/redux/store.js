import { compose, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import promiseMiddleware from "redux-promise-middleware"
import Raven from "raven-js"
import createRavenMiddleware from "raven-for-redux"
// import { routerMiddleware } from "react-router-redux"

import reducers from "./reducers"

export default function configureStore(initialState = {}, { api } = {}) {
  const shouldLog = process.env.NODE_ENV === "development"
  const shouldReport = true

  // Setup middleware
  const middleware = [
    thunk.withExtraArgument({ api }),
    promiseMiddleware(),
    // routerMiddleware(history),
  ]
  if (shouldLog) {
    middleware.push(logger)
  }
  if (shouldReport) {
    Raven.config(process.env.REAC_NATIVE_APP_SENTRY_URL, {
      allowSecretKey: true,
    }).install()
    middleware.push(createRavenMiddleware(Raven, {}))
  }

  // Setup middlewares and enhancers
  const enhancer = compose(applyMiddleware(...middleware))

  // Create redux store
  const store = createStore(reducers, initialState, enhancer)

  return store
}
