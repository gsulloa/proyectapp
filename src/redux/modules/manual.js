import { doFetch } from "./fetching"
import { newError } from "./error"
import { LOGOUT_SUCCESS } from "./authentication"

const SET_MANUALS = "SET_MANUALS"

const type = "MANUAL"
const initialState = {
  fetching: false,
  error: false,
  data: [
    { id: 1, name: "Logística", icon: "logistics" },
    { id: 2, name: "Talleres", icon: "workshop" },
    { id: 3, name: "Formación", icon: "education" },
  ],
}

export default function manual(state = initialState, action) {
  switch (action.type) {
    case SET_MANUALS:
      return {
        ...state,
        // ...action.payload,
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
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

function setManuals(manuals) {
  return {
    type: SET_MANUALS,
    payload: {
      data: manuals,
    },
  }
}

function fetchManuals(api) {
  return api.get("/reports/manuals")
}

export function getManuals() {
  return async (dispatch, getState, api) => {
    const response = await doFetch(
      dispatch,
      fetchManuals(api.api.withToken(getState().authentication.token)),
      type
    )
    if (response.error) {
      newError(dispatch, { e: response.error }, type)
    } else {
      dispatch(setManuals(response.manuals))
    }
  }
}
