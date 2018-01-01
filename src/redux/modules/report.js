import { doFetch } from "./fetching"
import { newError } from "./error"
import { LOGOUT_SUCCESS } from "./authentication"
import { ToastActionsCreators } from "react-native-redux-toast";

const type = "REPORT"
const initialState = {
  fetching: false,
  error: false,
}

export default function report(state = initialState, action) {
  switch (action.type) {
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
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

function createReport(api, data) {
  return api.post("/reports", data)
}

export function newReport(manualId, sectionId, content) {
  return async (dispatch, getState, api) => {
    const data = {
      manualId,
      sectionId,
      content,
    }
    const response = await doFetch(
      dispatch,
      createReport(api.api.withToken(getState().authentication.token), data),
      type,
      { status: getState().netinfo.online, content: data, post: true }
    )
    if (response.error) {
      newError(dispatch, { e: response.error }, type)
    } else {
      dispatch(ToastActionsCreators.displayInfo("Reporte creado correctamente"))
    }
  }
}
