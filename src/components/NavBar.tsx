import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar" aria-label="Main">
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className="navbar-link">
            List
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className="navbar-link">
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/compare" className="navbar-link">
            Compare
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
