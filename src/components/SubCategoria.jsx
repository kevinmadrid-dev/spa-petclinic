import { useParams } from "react-router-dom"
import ListPosts from "./ListPosts.jsx"

const SubCategoria = () => {
  const { subcategoria, id: categoria } = useParams()

  return (
    <div className="subcategoria-page">
      <ListPosts
        filters={{
          subcategoria: subcategoria.toLowerCase(),
          categoria
        }}
      />
    </div>
  )
}

export default SubCategoria
