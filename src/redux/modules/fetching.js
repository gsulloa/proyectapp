export async function doFetch(dispatch, request, type) {
  dispatch({ type: `${type}_FETCH_START` })
  const response = await request
  dispatch({ type: `${type}_FETCH_END` })
  return response
}
