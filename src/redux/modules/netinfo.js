import { NetInfo } from "react-native"
import { ToastActionsCreators } from "react-native-redux-toast"
import { syncOffline } from "./offline"
import { getEvents } from "./event"

const initialState = {
  online: false,
}

const CONNECTIVITY_CHANGE = "CONNECTIVITY_CHANGE"

export default function netinfo(state = initialState, action) {
  switch (action.type) {
    case CONNECTIVITY_CHANGE:
      return {
        ...action.payload,
        online: action.payload.type !== "none",
      }
    default:
      return state
  }
}

function connectivityChange(info) {
  return {
    type: CONNECTIVITY_CHANGE,
    payload: info,
  }
}

export const netinfoConfig = store => {
  NetInfo.getConnectionInfo().then(connectionInfo => {
    store.dispatch(connectivityChange(connectionInfo))
  })
  function handleConnectivityChange(connectionInfo) {
    store.dispatch(connectivityChange(connectionInfo))
    if (connectionInfo.type === "none") {
      store.dispatch(
        ToastActionsCreators.displayWarning(
          "Se ha perdido la conexión a internet"
        )
      )
    } else {
      store.dispatch(
        ToastActionsCreators.displayInfo("Conexión a internet establecida.")
      )
      store.dispatch(syncOffline())
      if (store.getState().authentication.isAuthenticated)
        store.dispatch(getEvents())
    }
  }
  NetInfo.addEventListener("connectionChange", handleConnectivityChange)
}
