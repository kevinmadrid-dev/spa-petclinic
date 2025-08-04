const ErrorMessage = ({
  message = "Ha ocurrido un error",
  onRetry = null,
  className = ""
}) => {
  return (
    <div className={`error-message ${className}`}>
      <div className="error-message__content">
        <h3 className="error-message__title">¡Oops!</h3>
        <p className="error-message__text">{message}</p>
        {onRetry && (
          <button className="error-message__retry-btn" onClick={onRetry}>
            Intentar nuevamente
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
