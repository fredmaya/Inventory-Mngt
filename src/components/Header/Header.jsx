//style
import "./Header.scss";

//library
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <header className="navBar">
      <nav className="navBar__container">
        <NavLink to="/" className="navBar__logo-container">
          <div className="navBar__logo"></div>
        </NavLink>
        <div className="navBar__block">
          <Link className="navBar__Link" to="/warehouses">
            <p className="navBar__text">Warehouse</p>
          </Link>
          <Link  className="navBar__Link" to="inventories">
            <p className="navBar__text">Inventory</p>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
