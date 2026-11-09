import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main>
      <h1>404 · Page not found</h1>
      <p>This page doesn't exist.</p>
      <Link to="/">Back to the list</Link>
    </main>
  )
}

export default NotFoundPage
