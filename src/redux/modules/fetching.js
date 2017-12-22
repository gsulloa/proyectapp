import { logoutUser } from "./authentication"

export async function doFetch(dispatch, request, type) {
  dispatch({ type: `${type}_FETCH_START` })
  const response = await request
  if (response.error && response.error.response.status === 401) {
    dispatch(logoutUser())
  }
  dispatch({ type: `${type}_FETCH_END` })
  return response
}
