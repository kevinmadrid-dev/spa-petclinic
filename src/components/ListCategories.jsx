import { Link } from "react-router-dom"
import { useCategories } from "../hooks/useApi.js"
import LoadingSpinner from "./ui/LoadingSpinner.jsx"
import ErrorMessage from "./ui/ErrorMessage.jsx"

const ListCategories = ({ className = "" }) => {
  const { data: categories, loading, error, refetch } = useCategories()

  if (loading) {
    return (
      <div className={`category-list-container ${className}`}>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`category-list-container ${className}`}>
        <ErrorMessage message="Error al cargar las categorías" onRetry={refetch} />
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return (
      <div className={`category-list-container ${className}`}>
        <p>No hay categorías disponibles</p>
      </div>
    )
  }

  return (
    <nav className={`category-list-container ${className}`}>
      <ul className="category-list container flex">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/categoria/${category.id}`}
              className={`category-list__category category-list__category--${category.id}`}>
              {category.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default ListCategories
