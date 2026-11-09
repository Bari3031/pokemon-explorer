import { NavLink } from 'react-router-dom'

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  fontWeight: isActive ? 'bold' : 'normal',
  textDecoration: isActive ? 'underline' : 'none',
})

function NavBar() {
  return (
    <nav>
      <NavLink to="/" end style={linkStyle}>
        List
      </NavLink>
      {' | '}
      <NavLink to="/favorites" style={linkStyle}>
        Favorites
      </NavLink>
      {' | '}
      <NavLink to="/compare" style={linkStyle}>
        Compare
      </NavLink>
    </nav>
  )
}

export default NavBar
