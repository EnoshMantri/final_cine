import { Link } from "react-router-dom";
import "../styles/styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">ByteCine</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
