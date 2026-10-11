import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkStyle = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-gray-200 text-gray-900'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold text-gray-900 transition-colors duration-200 hover:text-gray-600"
        >
          Personal Blog
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" end className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/create" className={linkStyle}>
            Create Post
          </NavLink>
          <NavLink to="/bookmarks" className={linkStyle}>
            Bookmarks
          </NavLink>
        </div>
      </div>

      {menuOpen && (
        <div className="space-y-1 border-t border-gray-100 px-4 py-3 md:hidden">
          <NavLink to="/" end onClick={closeMenu} className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/create" onClick={closeMenu} className={linkStyle}>
            Create Post
          </NavLink>
          <NavLink to="/bookmarks" onClick={closeMenu} className={linkStyle}>
            Bookmarks
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar