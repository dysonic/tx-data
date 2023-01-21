import React from 'react'
import { useRouteError } from 'react-router-dom'
// import "./Error.css";

interface RouterError {
  statusText: string | undefined
  message: string | undefined
}

export const ErrorPage = () => {
  const error = useRouteError() as RouterError
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error && (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      )}
    </div>
  )
}
