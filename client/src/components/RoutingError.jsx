import { useRouteError } from "react-router-dom"

function RoutingError() {
    let error = useRouteError();
  return (
    <div>
        <h1>{error.data}</h1>
        <h1>{error.status} - {error.statusText}</h1>
    </div>
  )
}

export default RoutingError