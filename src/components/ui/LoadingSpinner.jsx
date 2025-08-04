import "../../assets/css/componentes/ui.css"

const LoadingSpinner = ({ size = "medium", className = "" }) => {
  const sizeClass = `spinner--${size}`

  return (
    <div className={`spinner ${sizeClass} ${className}`}>
      <div className="spinner__circle"></div>
    </div>
  )
}

export default LoadingSpinner
