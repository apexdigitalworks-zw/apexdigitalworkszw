import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { COMPANY } from "../data/constants";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/policies", label: "Policies" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { totalCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" aria-label={`${COMPANY.name} home`}>
          <span className="navbar-brand-mark">A</span>
          <span className="navbar-brand-text">
            APEX<span className="accent">DIGITAL</span>WORKSZW
          </span>
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart" aria-label={`Cart, ${totalCount} items`}>
            🛒
            {totalCount > 0 && <span className="navbar-cart-badge">{totalCount}</span>}
          </Link>

          <div className="navbar-user navbar-user-desktop">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-outline btn-sm">
                  {user.fullName.split(" ")[0]}
                </Link>
                <button className="navbar-logout" onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                Log in
              </Link>
            )}
          </div>

          <button
            className="navbar-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className="navbar-burger-line"
              style={{ transform: open ? "rotate(45deg) translateY(7px)" : "none" }}
            />
            <span className="navbar-burger-line" style={{ opacity: open ? 0 : 1 }} />
            <span
              className="navbar-burger-line"
              style={{ transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }}
            />
          </button>
        </div>
      </div>

      <nav className={`navbar-mobile-menu${open ? " open" : ""}`} aria-label="Mobile navigation">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === "/"}>
            {link.label}
          </NavLink>
        ))}
        <div className="navbar-mobile-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-outline btn-sm">
                Dashboard
              </Link>
              <button className="navbar-logout" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm">
                Log in
              </Link>
              <Link to="/register" className="btn btn-outline btn-sm">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
