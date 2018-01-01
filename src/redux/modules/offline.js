import { doFetch } from "./fetching"
import { newError } from "./error"
import { ToastActionsCreators } from "react-native-redux-toast"

const initialState = {
  data: {
    events: [],
    reports: [],
    witchMails: [],
  },
  fetching: false,
  error: false,
  needSync: false,
}
const type = "OFFLINE"
const CLEAR_OFFLINE_DATA = "CLEAR_OFFLINE_DATA"
const STORE_OFFLINE = "STORE_OFFLINE"

export default function offline(state = initialState, action) {
  switch (action.type) {
    case `${STORE_OFFLINE}_EVENT`:
      return {
        ...state,
        needSync: true,
        data: {
          ...state.data,
          events: [...state.data.events, action.payload],
        },
      }
    case `${STORE_OFFLINE}_REPORT`:
      return {
        ...state,
        needSync: true,
        data: {
          ...state.data,
          reports: [...state.data.reports, action.payload],
        },
      }
    case `${STORE_OFFLINE}_WITCH_MAIL`:
      return {
        ...state,
        needSync: true,
        data: {
          ...state.data,
          witchMails: [...state.data.witchMails, action.payload],
        },
      }
    case CLEAR_OFFLINE_DATA:
      return {
        ...initialState,
      }
    case `${type}_FETCH_START`:
      return {
        ...state,
        fetching: true,
      }
    case `${type}_FETCH_END`:
      return {
        ...state,
        fetching: false,
      }
    case `${type}_SET_ERROR`:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

function sendBatch(api, data) {
  return api.post("/batch", data)
}

export function syncOffline() {
  return async (dispatch, getState, api) => {
    const data = getState().offline.data
    if (
      !getState().offline.needSync ||
      !getState().authentication.isAuthenticated
    ) {
      return
    }
    const response = await doFetch(
      dispatch,
      sendBatch(api.api.withToken(getState().authentication.token), data),
      type,
      { status: getState().netinfo.online }
    )
    if (response.error) {
      newError(dispatch, { e: response.error }, type)
    } else {
      dispatch({ type: CLEAR_OFFLINE_DATA })
      dispatch(
        ToastActionsCreators.displayInfo(
          "Datos almacenados enviados correctamente."
        )
      )
    }
  }
}

export function storeOffline(content, type) {
  return {
    type: `${STORE_OFFLINE}_${type}`,
    payload: content,
  }
}
