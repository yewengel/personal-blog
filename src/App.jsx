import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BlogDetails from './pages/BlogDetails'
import CreatePost from './pages/CreatePost'
import Bookmarks from './pages/Bookmarks'
import EditPost from './pages/EditPost'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-200">
        <Navbar />

        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
