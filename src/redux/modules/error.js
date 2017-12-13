export function newError(dispatch, error, type) {
  dispatch({
    type: `${type}_SET_ERROR`,
    payload: error,
  })
}
