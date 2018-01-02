import { ToastActionsCreators } from "react-native-redux-toast"

export function newError(dispatch, error, type) {
  dispatch({
    type: `${type}_SET_ERROR`,
    payload: error,
  })
  dispatch(
    ToastActionsCreators.displayError(`
Error en modulo ${type}:
Información: ${
      error.e.message ? JSON.stringify(error.e.message) : "ERROR DESCONOCIDO"
    }
En caso de que el error persista, avisar por el grupo de jefes :)
`)
  )
}
