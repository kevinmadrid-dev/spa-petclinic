import ListPosts from "../components/ListPosts.jsx"
import ListCategories from "../components/ListCategories.jsx"

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="container">
          <p className="subtitle">
            Descubre los mejores consejos y noticias para el cuidado de tu mascota
          </p>
        </div>
      </section>

      <ListCategories />

      <section className="latest-posts">
        <div className="container">
          <h2 className="section-title">Últimas Publicaciones</h2>
        </div>
        <ListPosts />
      </section>
    </main>
  )
}

export default Home
