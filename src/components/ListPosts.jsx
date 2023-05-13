import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../assets/css/componentes/card.css"
import { buscar } from "../api/api.js"

const ListPosts = ({ url }) => {
  const [posts, setPosts] = useState([])

  //Este Hook maneja estados secundarios, hace la solicitud a la API a través de buscar y se ejecuta si URL cambia
  useEffect(() => {
    buscar(url, setPosts)
  }, [url])

  return (
    <section className="posts container">
      {posts.map((post) => {
        const { id, title, metadescription, categoria } = post
        return (
          <Link
            to={`/posts/${id}`}
            className={`post__card post-card--${categoria}`}
            key={id}>
            <article>
              <h3 className="post-card__title">{title}</h3>
              <p className="post-card__meta">{metadescription}</p>
            </article>
          </Link>
        )
      })}
    </section>
  )
}

export default ListPosts
