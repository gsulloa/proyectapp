import { ToastActionsCreators } from "react-native-redux-toast"

export function newError(dispatch, error, type) {
  dispatch({
    type: `${type}_SET_ERROR`,
    payload: error,
  })
  dispatch(
    ToastActionsCreators.displayError(
      `Error en modulo ${type}:\nInformación: ${JSON.stringify(error)}`
    )
  )
}
