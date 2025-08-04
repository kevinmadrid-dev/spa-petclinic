import { useParams, Routes, Route, Link, useResolvedPath } from "react-router-dom"
import { useCategory } from "../hooks/useApi.js"
import LoadingSpinner from "./ui/LoadingSpinner.jsx"
import ErrorMessage from "./ui/ErrorMessage.jsx"
import ListCategories from "./ListCategories.jsx"
import ListPosts from "./ListPosts.jsx"
import SubCategoria from "./SubCategoria.jsx"

const Categoria = () => {
  const { id } = useParams()
  const url = useResolvedPath("").pathname
  const { data: categoryData, loading, error, refetch } = useCategory(id)

  const subcategorias = categoryData?.[0]?.subcategorias || []
  const categoryName = categoryData?.[0]?.nombre || ""

  if (loading) {
    return (
      <div className="container">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message="Error al cargar la categoría" onRetry={refetch} />
      </div>
    )
  }

  return (
    <>
      <div className="container">
        <h2 className="title-page">
          Pet Noticias {categoryName && `- ${categoryName}`}
        </h2>
        {categoryName && (
          <p className="category-description">
            Explora artículos sobre {categoryName.toLowerCase()} para tu mascota
          </p>
        )}
      </div>

      <ListCategories />

      {subcategorias.length > 0 && (
        <nav className="subcategory-nav">
          <div className="container">
            <h3 className="subcategory-title">Explora por tema</h3>
            <ul className="category-list flex">
              <li>
                <Link
                  to={`/categoria/${id}`}
                  className={`category-list__category category-list__category--${id} ${
                    url.endsWith(`/categoria/${id}`) ? "active" : ""
                  }`}>
                  Todos
                </Link>
              </li>
              {subcategorias.map((subcategoria) => (
                <li key={subcategoria}>
                  <Link
                    to={`${url}/${subcategoria.toLowerCase()}`}
                    className={`category-list__category category-list__category--${id}`}>
                    {subcategoria}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<ListPosts filters={{ categoria: id }} />} />
        <Route path="/:subcategoria" element={<SubCategoria />} />
      </Routes>
    </>
  )
}

export default Categoria
