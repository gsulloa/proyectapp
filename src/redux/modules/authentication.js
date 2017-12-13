import { doFetch } from "./fetching"
import { newError } from "./error"

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

const type = "LOGIN"
const initialState = {
  fetching: false,
  error: false,
  isAuthenticated: false,
  data: {},
}
export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        isAuthenticated: true,
        error: false,
        token: action.token,
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
/*
   api Fetchs
 */
function login(api, body) {
  return new Promise(resolve => {
    console.log("Creds send: ", body)
    return resolve({ token: "jsonweb.eyJ1c2VySWQiOjF9.token" })
  })
  //return api.post("/session", body)
}
/*
  before Actions
*/
export function loginUser(creds) {
  return async (dispatch, getState, api) => {
    const response = await doFetch(dispatch, login(api.api, creds), type)
    if (response.error) {
      newError(dispatch, { e: response.error }, type)
    } else {
      const data = response.token.split(".")
      const userInfo = JSON.parse(atob(data[1]))
      dispatch(
        receiveLogin(
          {
            userId: userInfo.userId,
            role: "user",
          },
          response.token
        )
      )
    }
  }
}

export function logoutUser() {
  return async dispatch => {
    dispatch({ type: "CLEAR_STORE" })
  }
}

function receiveLogin(data, token) {
  return {
    type: LOGIN_SUCCESS,
    data,
    token,
  }
}
