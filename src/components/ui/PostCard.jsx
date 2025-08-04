import { Link } from "react-router-dom"

const PostCard = ({ post, className = "" }) => {
  const { id, title, metadescription, categoria } = post

  return (
    <Link
      to={`/posts/${id}`}
      className={`post__card post-card--${categoria} ${className}`}>
      <article className="post-card__content">
        <h3 className="post-card__title">{title}</h3>
        <p className="post-card__meta">{metadescription}</p>
        <div className="post-card__category">
          <span className={`category-tag category-tag--${categoria}`}>
            {categoria}
          </span>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
