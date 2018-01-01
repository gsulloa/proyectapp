import { logoutUser } from "./authentication"
import { storeOffline } from "./offline"

export async function doFetch(dispatch, request, type, net = { status: true }) {
  if (net.status) {
    dispatch({ type: `${type}_FETCH_START` })
    const response = await request
    if (response.error) {
      if (response.error.response && response.error.response.status === 401) {
        dispatch(logoutUser())
      }
    }
    dispatch({ type: `${type}_FETCH_END` })
    return response
  } else {
    dispatch(storeOffline(net.content, type))
    return {}
  }
}
