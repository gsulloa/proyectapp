import { doFetch } from "./fetching"
import { newError } from "./error"
import { LOGOUT_SUCCESS } from "./authentication"
import { Actions } from "react-native-router-flux"
import { ToastActionsCreators } from "react-native-redux-toast";

const SET_WITCHMAILS = "SET_WITCHMAILS"
const SET_READ = "SET_READ"

const type = "WITCH_MAIL"
const initialState = {
  fetching: false,
  error: false,
  data: [],
}

export default function witchMail(state = initialState, action) {
  switch (action.type) {
    case SET_WITCHMAILS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
      }
    case SET_READ: {
      const index = state.data.findIndex(mail => mail.id === action.payload.id)
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          { ...state.data[index], seen: true },
          ...state.data.slice(index + 1),
        ],
      }
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

function setWitchMails(witchMails) {
  return {
    type: SET_WITCHMAILS,
    payload: {
      data: witchMails,
    },
  }
}

export function setRead(id) {
  return {
    type: SET_READ,
    payload: {
      id,
    },
  }
}

function fetchWitchMails(api) {
  return api.get("/witchmail")
}

function createWitchMail(api, recipientId, content) {
  return api.post("/witchmail", {
    recipientId,
    content,
  })
}

export function getWitchMails() {
  return async (dispatch, getState, api) => {
    const response = await doFetch(
      dispatch,
      fetchWitchMails(api.api.withToken(getState().authentication.token)),
      type
    )
    if (response.error) {
      newError(dispatch, { e: response.error }, type)
    } else {
      dispatch(setWitchMails(response))
    }
  }
}

export function newWitchMail({ community, content }) {
  return async (dispatch, getState, api) => {
    const response = await doFetch(
      dispatch,
      createWitchMail(
        api.api.withToken(getState().authentication.token),
        community,
        content
      ),
      type,
      {
        status: getState().netinfo.online,
        content: { recipientId: community, content },
        post: true,
      }
    )
    if (response.error) {
      newError(dispatch, { e: response.error }, type)
    } else {
      Actions.popTo("witchMailIndex")
      dispatch(ToastActionsCreators.displayInfo("Correo creado correctamente."))
    }
  }
}
