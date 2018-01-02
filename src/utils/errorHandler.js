import Raven from "raven-js"

export default function errorHandler(e) {
  Raven.captureException(e)
}
