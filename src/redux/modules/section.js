import { doFetch } from "./fetching"
import { newError } from "./error"
import { LOGOUT_SUCCESS } from "./authentication"

const SET_SECTIONS = "SET_SECTIONS"

const type = "SECTION"
const initialState = {
  fetching: false,
  error: false,
  data: {},
}

export default function section(state = initialState, action) {
  switch (action.type) {
    case SET_SECTIONS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.manualId]: action.payload.data,
        },
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

function setSections(sections, manualId) {
  return {
    type: SET_SECTIONS,
    payload: {
      data: sections,
      manualId,
    },
  }
}

function fetchSections(api, id) {
  return api.get(`/reports/sections/${id}`)
}

export function getSections(id) {
  return async (dispatch, getState, api) => {
    const response = await doFetch(
      dispatch,
      fetchSections(api.api.withToken(getState().authentication.token), id),
      type
    )
    if (response.error) {
      newError(dispatch, { e: response.error }, type)
    } else {
      dispatch(setSections(response.sections, id))
    }
  }
}
