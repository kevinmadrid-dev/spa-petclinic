import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/AppContext.js"
import "./assets/css/base/base.css"
import "./assets/css/componentes/card.css"
import "./assets/css/componentes/header.css"
import "./assets/css/componentes/ui.css"
import "./assets/css/blog.css"
import Home from "./pages/Home.jsx"
import Sobre from "./pages/Sobre.jsx"
import Header from "./components/Header.jsx"
import Post from "./components/Post.jsx"
import Categoria from "./components/Categoria.jsx"
import Page404 from "./pages/Page404.jsx"

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/categoria/:id/*" element={<Categoria />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
