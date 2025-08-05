import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { usePost } from "../hooks/useApi.js"
import LoadingSpinner from "./ui/LoadingSpinner.jsx"
import ErrorMessage from "./ui/ErrorMessage.jsx"

const Post = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: post, loading, error } = usePost(id)

  useEffect(() => {
    if (error && error.includes("404")) {
      navigate("/not-found", { replace: true })
    }
  }, [error, navigate])

  if (loading) {
    return (
      <main className="container flex flex--center">
        <LoadingSpinner size="large" />
      </main>
    )
  }

  if (error && !error.includes("404")) {
    return (
      <main className="container flex flex--center">
        <ErrorMessage
          message="Error al cargar el post"
          onRetry={() => window.location.reload()}
        />
      </main>
    )
  }

  if (!post) {
    return null
  }

  return (
    <main className="container flex flex--center">
      <article className="card post">
        <header className="post__header">
          <h1 className="post-card__title">{post.title}</h1>
          {post.categoria && (
            <span className={`category-tag category-tag--${post.categoria}`}>
              {post.categoria}
            </span>
          )}
        </header>

        <div className="post__content">
          <p className="text__card">{post.body}</p>
        </div>

        <footer className="post__footer">
          <button className="btn btn--secondary" onClick={() => navigate(-1)}>
            ← Volver
          </button>
        </footer>
      </article>
    </main>
  )
}

export default Post
