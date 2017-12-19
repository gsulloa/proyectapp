import { doFetch } from "./fetching"
import { newError } from "./error"
import { LOGOUT_SUCCESS } from "./authentication"

const SET_COMMUNITIES = "SET_COMMUNITIES"

const type = "COMMUNITY"
const initialState = {
  fetching: false,
  error: false,
  data: [],
}

export default function community(state = initialState, action) {
  switch (action.type) {
    case SET_COMMUNITIES:
      return {
        ...state,
        ...action.payload,
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

function setCommunities(communities) {
  return {
    type: SET_COMMUNITIES,
    payload: {
      data: communities,
    },
  }
}

function fetchCommunities(api) {
  return api.get("/communities")
}

export function getCommunities() {
  return async (dispatch, getState, api) => {
    const response = await doFetch(
      dispatch,
      fetchCommunities(api.api.withToken(getState().authentication.token)),
      type
    )
    if (response.error) {
      newError(dispatch, { e: response.error }, type)
    } else {
      dispatch(setCommunities(response.communities))
    }
  }
}
