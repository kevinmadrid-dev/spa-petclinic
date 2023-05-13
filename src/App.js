import "./assets/css/base/base.css"
import "./assets/css/componentes/card.css"
import Home from "./pages/Home.jsx"
import Sobre from "./pages/Sobre.jsx"
import Header from "./components/Header"
import Page404 from "./pages/Page404"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Post from "./pages/Post.jsx"

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default App
