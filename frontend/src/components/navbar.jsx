import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* 🔥 LOGO (CLICKABLE HOME) */}
        <Link to="/" className="logo">
          Sample-Web
        </Link>

        {/* 🔥 NAV LINKS */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/">Android</Link>
          <Link to="/">Google</Link>
          <Link to="/">About</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;