import { Outlet, Link } from 'react-router-dom'

export default function SiteLayout() {
  return (
    <div className="container">
      <header className="row" style={{ marginBottom: 16 }}>
        <nav className="row" style={{ gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/app">App</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}


