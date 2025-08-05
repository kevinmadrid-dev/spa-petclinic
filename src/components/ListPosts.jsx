import { usePosts } from "../hooks/useApi.js"
import PostCard from "./ui/PostCard.jsx"
import LoadingSpinner from "./ui/LoadingSpinner.jsx"
import ErrorMessage from "./ui/ErrorMessage.jsx"

const ListPosts = ({ filters = {}, className = "" }) => {
  const { data: posts, loading, error, refetch } = usePosts(filters)

  if (loading) {
    return (
      <section className={`posts container ${className}`}>
        <LoadingSpinner size="large" />
      </section>
    )
  }

  if (error) {
    return (
      <section className={`posts container ${className}`}>
        <ErrorMessage
          message={`Error al cargar los posts: ${error}`}
          onRetry={refetch}
        />
      </section>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <section className={`posts container ${className}`}>
        <div className="empty-state">
          <h3>No hay posts disponibles</h3>
          <p>Intenta con otros filtros o vuelve más tarde.</p>
        </div>
      </section>
    )
  }

  return (
    <section className={`posts container ${className}`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  )
}

export default ListPosts
