import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Beacon" />
      </a>

      <span role="button" className="navbar-toggle navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
        onClick={() => {
          const toggle: Element = document.querySelector(".navbar-toggle") as Element;
          const menu: Element = document.querySelector(".navbar-menu") as Element;
          toggle.classList.toggle("is-active");
          menu.classList.toggle("is-active");
        }}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </span>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <span className="navbar-item">
          Home
      </span>

        <span className="navbar-item">
          Documentation
      </span>

        <div className="navbar-item has-dropdown is-hoverable">
          <span className="navbar-link">
            More
        </span>

          <div className="navbar-dropdown">
            <span className="navbar-item">
              About
          </span>
            <span className="navbar-item">
              Jobs
          </span>
            <span className="navbar-item">
              Contact
          </span>
            <hr className="navbar-divider" />
            <span className="navbar-item">
              Report an issue
          </span>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to='/register'><span className="button is-primary">Register</span></Link>
            <Link to='/login'><span className="button is-light">Login</span></Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;