import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import ComparePage from './pages/ComparePage'
import DetailsPage from './pages/DetailsPage'
import FavoritesPage from './pages/FavoritesPage'
import ListPage from './pages/ListPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/pokemon/:id" element={<DetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
