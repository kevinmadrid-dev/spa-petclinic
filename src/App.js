import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./assets/css/base/base.css"
import "./assets/css/componentes/card.css"
import Home from "./pages/Home.jsx"
import Sobre from "./pages/Sobre.jsx"
import Header from "./components/Header.jsx"
import Post from "./components/Post.jsx"
import Categoria from "./components/Categoria.jsx"
import Page404 from "./pages/Page404.jsx"

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/categoria/:id/*" element={<Categoria />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default App
