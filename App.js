import React from "react"
import App from "./src/App"
// import createHistory from "history/createBrowserHistory"
import Api from "./src/Api"
import configureStore from "./src/redux/store"
import { devlog } from "./src/utils/log"

// const history = createHistory()
const client = new Api(process.env.REACT_APP_API || "http://localhost:3000")

// Redux required objects
const initialState = {}
const store = configureStore(initialState, { client })

// App general settings
const options = { hydratation: { blacklist: ["hydratation", "router"] } }

devlog("index.js", "store", store, "options", options)

export default class RootApp extends React.Component {
  render() {
    return <App store={store} options={options} />
  }
}
